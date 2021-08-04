import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { faDesktop, IconDefinition, faCheck, faThermometer, faPhotoVideo, faSpinner, faTimesCircle, faSync, faTimes, faRedo } from '@fortawesome/free-solid-svg-icons';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import * as moment from 'moment';
import { AquariumService } from 'src/app/services/aquarium.service';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Aquarium } from 'src/app/models/Aquarium';
import { DeviceScheduleTask, DeviceScheduleTaskTypes } from 'src/app/models/DeviceScheduleTask';

import { DeviceScheduleState } from 'src/app/models/DeviceScheduleState';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'device-overview-card',
    templateUrl: './device-overview-card.component.html',
    styleUrls: ['./device-overview-card.component.scss']
})
export class DeviceOverviewCardComponent implements OnInit {

    @Input() aquarium: Aquarium;
    public latestSnapshot: AquariumSnapshot;
    public deviceStatus: number;
    public lastUpdateTime: Date;

    public faDevice: IconDefinition = faDesktop;
    public faRedo: IconDefinition = faRedo;
    public faCheck: IconDefinition = faCheck;
    public faTimes: IconDefinition = faTimes;
    public faTimesCircle: IconDefinition = faTimesCircle;
    public faSpinner: IconDefinition = faSpinner;
    public faPhotoVideo: IconDefinition = faPhotoVideo
    public faThermometer: IconDefinition = faThermometer
    public faRefresh: IconDefinition = faSync;
    private componentLifeCycle$ = new Subject();
    scanning: boolean;
    performingTask: boolean;
    scheduleState: DeviceScheduleState = new DeviceScheduleState();

    constructor(private _aquariumService: AquariumService,
        private _notifier: NotificationService,
        private dialog: MatDialog) {

    }
    ngOnInit() {
        this.pingAquariumDevice();
    }
    ngOnDestory() {
        this.componentLifeCycle$.next();
        this.componentLifeCycle$.unsubscribe();
    }
    public pingAquariumDevice() {
        this.deviceStatus = 1;
        this._aquariumService.pingDevice(this.aquarium.device.id).pipe(take(1)).subscribe(val => {
            this.deviceStatus = 2;
            this.lastUpdateTime = new Date();
        }, (err) => {
            this.deviceStatus = 0;
        });
        this.clickGetDeviceScheduleStatus();
    }
    clickGetDeviceScheduleStatus() { //todo rename this
        this.scanning = true;
        this._aquariumService.getDeviceScheduleStatus(this.aquarium.device.id).subscribe(
            (scheduleState: DeviceScheduleState) => {
                console.log(scheduleState);
                this.scheduleState = scheduleState;
            }, err => {
                this.scanning = false;
                this._notifier.notify("error", "Could not retrieve device information");
            })
    }
    clickPerformTask(task: DeviceScheduleTask) {
        this.performingTask = true;
        this._aquariumService.performScheduleTask(this.aquarium.device.id, task).subscribe(
            (data) => {
                this.performingTask = false;
                this._notifier.notify("success", "Task was performed successfully!");
            }, err => {
                this.performingTask = false;
                this._notifier.notify("error", "Task: " + err.error);
            })
    }
    public parseDate(date: Date) {
        return moment(date).local().calendar();
    }


    public getTaskNameFromId = DeviceScheduleTask.getTaskNameFromId;
    public getETAForTask = DeviceScheduleTask.getETAForTask;
}