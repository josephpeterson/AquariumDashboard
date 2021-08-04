import { Component, OnInit, Input, Inject } from '@angular/core';

import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { isTakingSnapshot, getDidTake, getTakeError } from 'src/app/store/snapshot/snapshot.selector';
import { SnapshotTakeAction } from 'src/app/store/snapshot/snapshot.actions';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { faCamera, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CameraConfiguration, CameraExposureModes } from 'src/app/models/CameraConfiguration';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'snapshot-photo-config-detail',
    templateUrl: './snapshot-photo-config-detail.component.html',
    styleUrls: ['./snapshot-photo-config-detail.component.scss']
})
export class SnapshotPhotoConfigDetail implements OnInit {
    @Input() public device: AquariumDevice;
    public editing = true;
    public updating = false;

    public faCamera: IconDefinition = faCamera;

    //Store data
    public aquarium$ = this.store.select(getSelectedAquarium);
    public exposureModes = CameraExposureModes;


    ngOnInit() {
        if (!this.device)
            this.aquarium$.pipe(take(2)).subscribe(aq => this.device = {...aq.device});
        else
            this.device = {...this.device}
    }

    clickEdit() {
        this.editing = true;
    }
    clickCancel() {
        this.editing = false;
    }
    clickReset() {
        var config = new CameraConfiguration();
        config.id = this.device.cameraConfiguration.id;
        this.device.cameraConfiguration = config;
    }
    clickUpdateCamera() {
        //this.editing = true;
        this.updating = true;
        console.log(this.device);
        this._aquariumService.updateAquariumDevice(this.device).subscribe(
            (device: AquariumDevice) => {
                this.device = device;
                this.updating = false;
            },
            (err) => {
                this.notifier.notify("error", "Could not update camera settings");
                this.updating = false;
            }
        );
    }
    constructor(private notifier: NotificationService, private store: Store<AppState>, private _aquariumService: AquariumService){}
}

