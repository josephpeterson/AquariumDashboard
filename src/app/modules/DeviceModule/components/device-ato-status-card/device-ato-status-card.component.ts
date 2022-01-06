import { Component, OnInit, Input } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';

import { faCaretLeft, faCaretRight, faCheck, faCheckCircle, faRedo, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ManagePhotoConfigurationModal } from 'src/app/modules/SharedModule/modals/manage-photo-configuration/manage-photo-configuration.component';
import { ATOStatus } from 'src/app/models/ATOStatus';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { RunATOModalComponent } from '../../../SharedModule/modals/run-ato-modal/run-ato-modal.component';
import { PaginationSliver } from 'src/app/models/PaginationSliver';
import { GpioPinValue } from 'src/app/models/types/GpioPinValue';
import { DeviceScheduleTask } from 'src/app/models/DeviceScheduleTask';
import { NotificationService } from 'src/app/services/notification.service';
import { DeviceInformation } from 'src/app/models/DeviceInformation';
import { DeviceScheduleTaskTypes } from 'src/app/models/types/DeviceScheduleTaskTypes';
import { JobStatus } from 'src/app/models/types/JobStatus';
import { DeviceConnectionStatus } from 'src/app/models/types/DeviceConnectionStatus';

@Component({
  selector: 'device-ato-status-card',
  templateUrl: './device-ato-status-card.component.html',
  styleUrls: ['./device-ato-status-card.component.scss']
})
export class DeviceATOStatusComponent implements OnInit {

  @Input() public device: AquariumDevice;
  @Input() public deviceInformation: DeviceInformation; //deployed device information
  @Input() public deviceConnectionStatus: DeviceConnectionStatus;
  public DeviceConnectionStatus = DeviceConnectionStatus;
  scanning: boolean;

  faCheckCircle = faCheckCircle;
  faRedo = faRedo;
  faCheck = faCheck;
  faTimes = faTimes;
  faSpinner = faSpinner;

  pinging: boolean;

  public atoStatus: ATOStatus;
  public enabled:boolean;
  public atoHistory: ATOStatus[];

  public loading: boolean = false;

  public currentATOProgress: number;
  public updateTick;
  public pagination: PaginationSliver = new PaginationSliver();


  public atoRecommended: boolean = true;

  public faCaretLeft = faCaretLeft;
  public faCaretRight = faCaretRight;

  constructor(public _aquariumService: AquariumService,
    public notifier: NotificationService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.pagination.descending = true;
    this.pagination.count = 5;

    //this.loadStatus();
    this.loadATOHistory();
    this.updateTick = setInterval(() => this.updateATOProgress(), 100);
  }
  ngOnDestroy(): void {
    clearInterval(this.updateTick);
  }
  public getRunningJob() {
    var atoTasks = this.device.tasks.filter(t => t.taskTypeId == DeviceScheduleTaskTypes.StartATO);
    var task = this.deviceInformation.scheduledJobs.filter(sj => sj.status == JobStatus.Running && atoTasks.filter(t => t.id == sj.taskId).length > 0);
    if(task.length > 0)
      return task[0];
    return null;
  }
  public getSensorFromId(id: number) {
    var sensor = this.device.sensors.find(s => s.id == id);
    return sensor;
  }
  public getNextATOJob() {
    var atoTasks = this.device.tasks.filter(t => t.taskTypeId == DeviceScheduleTaskTypes.StartATO);
    var task = this.deviceInformation.scheduledJobs.filter(sj => sj.status == JobStatus.Ready && atoTasks.filter(t => t.id == sj.taskId).length > 0);
    if(task.length > 0)
    {
      task[0].task = atoTasks.filter(t => t.id == task[0].taskId)[0];
      return task[0];

    }
    return null;
  }
  public checkEnabled() {
    if(!this.device.tasks)
      return;
    var task = this.device.tasks.filter(t => t.taskTypeId == DeviceScheduleTaskTypes.StartATO)
    return task.length > 0;
  }
  //parse date from utc
  public parseDateFromUtc(date: string, timeOnly: boolean = false) {
    if (!date)
      return "--:--";
    var mdate = moment.utc(date).local();
    if (timeOnly)
      return mdate.format('h:mm a');
    return mdate.calendar();
  }
  public parseDate(date: string) {
    return moment(date).local().calendar();
  }
  public parseDuration(date: string) {
    var actual = moment.utc(date);
    var end = moment();
    return moment.duration(actual.diff(end)).humanize();
  }
  public computeTimeDifference(atoStatus: ATOStatus) {
    var actual = moment(atoStatus.actualEndTime);
    var est = moment(atoStatus.estimatedEndTime);
    var s = moment.duration(actual.diff(est)).asSeconds();
    return Math.ceil(s);
  }
  public getRunTime(atoStatus: ATOStatus) {
    var actual = moment(atoStatus.startTime);
    var end = moment(atoStatus.actualEndTime);
    var s = moment.duration(actual.diff(end)).humanize();
    return s;
  }
  public updateATOProgress() {
    var ato = this.atoStatus;
    if (!ato)
      return;
    var start = Date.parse(ato.startTime);
    var estEnd = Date.parse(ato.estimatedEndTime);
    var current = Date.now();

    var totalMs = ato.maxRuntime * 60 * 1000;
    var passedMs = current - start;
    this.currentATOProgress = Math.floor(passedMs / totalMs * 10000) / 100;
  }
  public clickRunATO() {

    this.dialog.open(RunATOModalComponent, {
    }).afterClosed().subscribe((res) => {
      if (res.run) {
        this.loading = true;
        this._aquariumService.runDeviceATO(this.device.id, parseInt(res.runtime)).subscribe(status => {
          this.atoStatus = status;
          this.loading = false;
        }, (err: HttpErrorResponse) => {
          this.loading = false;
        });
      }
    });
  }
  public clickStopATO() {
    this.loading = true;
    this._aquariumService.stopDeviceATO(this.device.id).subscribe(status => {
      this.atoStatus = status;
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.loading = false;
    })
  }
  public clickRefresh() {
    //this.loadStatus();
    this.loadATOHistory();
  }
  public loadATOHistory() {
    this._aquariumService.getDeviceATOHistory(this.device.id, this.pagination).subscribe(atoHistory => {
      this.atoHistory = atoHistory;
      //this.loading = false;
    }, (err: HttpErrorResponse) => {
      //this.loading = false;
    })
  }
  public isRunnable() {
    var nextTask = this.getNextATOJob();
    if (!nextTask)
      return false;
    var sensor = this.getSensorFromId(nextTask.task.triggerSensorId);
    if(nextTask.task.triggerSensorValue == null || !sensor)
      return true;
    return nextTask.task.triggerSensorValue == sensor.value;
  }
  public loadForward() {
    var add = 5;
    var max = 5;
    this.pagination.count += add;
    if (this.pagination.count > max)
    {
      this.pagination.start += this.pagination.count-max;
      this.pagination.count = max;
    }
      this.loadATOHistory();
  }
  public loadBackward() {
    var sub = 5;
    this.pagination.start -= sub;
    if (this.pagination.start < 0)
      this.pagination.start = 0;
    this.loadATOHistory();
  }
  public getPageNumber() {
    var perPage = 5;
    var current = this.pagination.start;
    return 1 + current/perPage;
  }
}
