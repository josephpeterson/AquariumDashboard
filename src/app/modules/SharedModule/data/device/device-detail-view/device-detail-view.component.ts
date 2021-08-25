import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { faDesktop, IconDefinition, faCheck, faThermometer, faPhotoVideo, faSpinner, faTimesCircle, faSync } from '@fortawesome/free-solid-svg-icons';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import * as moment from 'moment';
import { AquariumService } from 'src/app/services/aquarium.service';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Aquarium } from 'src/app/models/Aquarium';
import { CreateWaterParameterModalComponent } from '../../../modals/create-water-parameter-modal/create-water-parameter-modal.component';


@Component({
    selector: 'device-detail-view',
    templateUrl: './device-detail-view.component.html',
    styleUrls: ['./device-detail-view.component.scss']
})
export class DeviceDetailViewComponent implements OnInit {

    @Input() aquarium: Aquarium;
    public latestSnapshot: AquariumSnapshot;
    public deviceStatus: number;
    public faDevice: IconDefinition = faDesktop;
    public faCheck: IconDefinition = faCheck;
    public faTimesCircle: IconDefinition = faTimesCircle;
    public faSpinner: IconDefinition = faSpinner;
    public faPhotoVideo: IconDefinition = faPhotoVideo
    public faThermometer: IconDefinition = faThermometer
    public faRefresh: IconDefinition = faSync;
    private componentLifeCycle$ = new Subject();

    constructor(private _aquariumService: AquariumService,
        private dialog: MatDialog) {

    }
    ngOnInit() {
        this.getLatestSnapshot();
        this.pingAquariumDevice();
    }
    ngOnDestory() {
        this.componentLifeCycle$.next();
        this.componentLifeCycle$.unsubscribe();
    }

    public getLatestSnapshot() {
        this._aquariumService.getSnapshots(this.aquarium.id, 0, 1).subscribe(snapshot => {
            if (snapshot.length > 0)
                this.latestSnapshot = snapshot[0];
            else
                delete this.latestSnapshot
        }, (err) => {

        });
    }
    public pingAquariumDevice() {
        this.deviceStatus = 1;
        this._aquariumService.pingDevice(this.aquarium.device.id).pipe(take(1)).subscribe(val => {
            this.deviceStatus = 2;
        }, (err) => {
            this.deviceStatus = 0;
        });
    }

    public getSnapshotAge(): string {
        if(this.latestSnapshot)
            return moment.utc(this.latestSnapshot.startTime).local().calendar();
    }

    public clickAddSnapshot() {
        this.dialog.open(CreateWaterParameterModalComponent, {
            //width: "50%",
            data: this.aquarium
        }).afterClosed().subscribe((snapshot: AquariumSnapshot) => {
            if (snapshot) {
                //add snapshot to table
            }
        });
    }
}