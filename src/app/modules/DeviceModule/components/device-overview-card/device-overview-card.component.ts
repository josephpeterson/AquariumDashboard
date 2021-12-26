import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { faDesktop, IconDefinition, faCheck, faThermometer, faPhotoVideo, faSpinner, faTimesCircle, faSync, faTimes, faRedo } from '@fortawesome/free-solid-svg-icons';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import * as moment from 'moment';
import { AquariumService } from 'src/app/services/aquarium.service';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Aquarium } from 'src/app/models/Aquarium';
import { DeviceScheduleTask } from 'src/app/models/DeviceScheduleTask';
import { DeviceScheduleTaskTypes } from "src/app/models/types/DeviceScheduleTaskTypes";

import { DeviceScheduleState } from 'src/app/models/DeviceScheduleState';
import { NotificationService } from 'src/app/services/notification.service';
import { DeviceInformation } from 'src/app/models/DeviceInformation';
import { DeviceConnectionStatus } from "src/app/models/types/DeviceConnectionStatus";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumLoadByIdAction, AquariumLoadDeployedDeviceByAquaruiumId } from 'src/app/store/aquarium/aquarium.actions';

@Component({
    selector: 'device-overview-card',
    templateUrl: './device-overview-card.component.html',
    styleUrls: ['./device-overview-card.component.scss']
})
export class DeviceOverviewCardComponent {

    @Input() aquarium: Aquarium;
    @Input() public deviceInformation: DeviceInformation;
    @Input() public deviceConnectionStatus: DeviceConnectionStatus;
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
        private store: Store<AppState>,
        private _notifier: NotificationService,
        private dialog: MatDialog) {

    }

    public clickPingAquariumDevice() {
        this.store.dispatch(new AquariumLoadDeployedDeviceByAquaruiumId(this.aquarium.device.id));
    }
    public readableDate(dateString: string) {
        return moment(dateString).calendar();
    }
}