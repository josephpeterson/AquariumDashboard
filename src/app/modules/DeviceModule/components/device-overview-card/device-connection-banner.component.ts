import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { faDesktop, IconDefinition, faCheck, faThermometer, faPhotoVideo, faSpinner, faTimesCircle, faSync, faTimes, faRedo } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { AquariumService } from 'src/app/services/aquarium.service';
import { MatDialog } from '@angular/material/dialog';
import { Aquarium } from 'src/app/models/Aquarium';

import { NotificationService } from 'src/app/services/notification.service';
import { DeviceConnectionStatus } from "src/app/models/types/DeviceConnectionStatus";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumLoadDeployedDeviceByAquaruiumId, AquariumSelectionAction } from 'src/app/store/aquarium/aquarium.actions';
import { getDeployedDeviceInformation } from 'src/app/store/aquarium/aquarium.selector';
import { DeviceInformation } from 'src/app/modules/SharedDeviceModule/models/DeviceInformation';
import { connectToDevice } from 'src/app/modules/SharedDeviceModule/store/device.actions';
import { selectDeviceConnection, selectDeviceInformation } from 'src/app/modules/SharedDeviceModule/store/device.selectors';
import { DeviceConnectionState } from 'src/app/modules/SharedDeviceModule/store/device.reducer';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'device-connection-banner',
    templateUrl: './device-connection-banner.component.html',
    styleUrls: ['./device-connection-banner.component.scss']
})
export class DeviceConnectionBannerComponent {
    public deviceInformation$: Observable<DeviceInformation> = this.store.select(selectDeviceInformation);
    public deviceConnectionStatus$: Observable<DeviceConnectionState> = this.store.select(selectDeviceConnection);
    DeviceConnectionStatus = DeviceConnectionStatus;
    public faDevice: IconDefinition = faDesktop;
    public faRedo: IconDefinition = faRedo;
    public faCheck: IconDefinition = faCheck;
    public faTimes: IconDefinition = faTimes;
    public faTimesCircle: IconDefinition = faTimesCircle;
    public faSpinner: IconDefinition = faSpinner;
    public faPhotoVideo: IconDefinition = faPhotoVideo
    public faThermometer: IconDefinition = faThermometer
    public faRefresh: IconDefinition = faSync;

    constructor(private _aquariumService: AquariumService,
        private store: Store,
        private _notifier: ToastrService,
        private dialog: MatDialog) {
            
    }

    public clickPingAquariumDevice() {
        //This one actually pings the device
        //this.store.dispatch(new AquariumLoadDeployedDeviceByAquaruiumId(this.aquarium.device.id));
        this.store.dispatch(connectToDevice());
    }
    public readableDate(dateString: string) {
        return moment(dateString).calendar();
    }
    public getNextTaskETA() {
       return "Not implemented";
    }
}