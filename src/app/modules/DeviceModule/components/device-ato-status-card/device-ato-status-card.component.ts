import { Component, OnInit, Input } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';

import { faCheck, faCheckCircle, faRedo, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ManagePhotoConfigurationModal } from 'src/app/modules/SharedModule/modals/manage-photo-configuration/manage-photo-configuration.component';
import { ATOStatus } from 'src/app/models/ATOStatus';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { RunATOModalComponent } from '../../../SharedModule/modals/run-ato-modal/run-ato-modal.component';
import { GpioPinValue } from 'src/app/models/types/GpioPinValue';
import { DeviceScheduleTask } from 'src/app/modules/SharedDeviceModule/models/DeviceScheduleTask';
import { NotificationService } from 'src/app/services/notification.service';
import { DeviceInformation } from 'src/app/modules/SharedDeviceModule/models/DeviceInformation';
import { DeviceScheduleTaskTypes } from 'src/app/models/types/DeviceScheduleTaskTypes';
import { JobStatus } from 'src/app/models/types/JobStatus';
import { DeviceConnectionStatus } from 'src/app/models/types/DeviceConnectionStatus';
import { DeviceScheduledJob } from 'src/app/modules/SharedDeviceModule/models/DeviceScheduledJob';
import { DateFormatProvider } from 'src/app/providers/DateFormatProvider';
import { PaginatedComponent } from '../../../CoreModule/components/PaginatedComponent';
@Component({
  selector: 'device-ato-status-card',
  templateUrl: './device-ato-status-card.component.html',
  styleUrls: ['./device-ato-status-card.component.scss']
})
export class DeviceATOStatusComponent extends PaginatedComponent implements OnInit {

  @Input() public device: AquariumDevice;
  @Input() public aquarium: Aquarium;
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
  public enabled: boolean;
  public atoHistory: ATOStatus[];

  public loading: boolean = false;

  public currentATOProgress: number;
  public updateTick;

  public atoRecommended: boolean = true;


  nextATOJob: DeviceScheduledJob;
  runningATOJob: DeviceScheduledJob;
  hasMore: boolean;

  constructor(public _aquariumService: AquariumService,
    public notifier: NotificationService,
    public dialog: MatDialog) { super(); }

  ngOnInit() {
    this.pagination.descending = true;
    this.pagination.count = 5;

    this.loadATOHistory();
    this.updateTick = setInterval(() => this.updateATOProgress(), 100);
    this.nextATOJob = this.getNextATOJob();
    this.runningATOJob = this.getRunningJob();
  }
  ngOnDestroy(): void {
    clearInterval(this.updateTick);
  }
  public getRunningJob(): DeviceScheduledJob {
    /*
    if (!this.device || !this.device.tasks)
      return null;
    var atoTasks = this.device.tasks.filter(t => t.taskTypeId == DeviceScheduleTaskTypes.StartATO);
    var task = this.deviceInformation.scheduledJobs.filter(sj => sj.status == JobStatus.Running && atoTasks.filter(t => t.id == sj.taskId).length > 0);
    if (task.length > 0)
      return task[0];
      */
    return null;
  }
  public getSensorFromId(id: number) {
    var sensor = this.device.sensors.find(s => s.id == id);
    return sensor;
  }
  public getNextATOJob(): DeviceScheduledJob {
    /*
    if (!this.device || !this.device.tasks)
      return null;
    var atoTasks = this.device.tasks.filter(t => t.taskTypeId == DeviceScheduleTaskTypes.StartATO);
    var task = this.deviceInformation.scheduledJobs.filter(sj => sj.status == JobStatus.Ready && atoTasks.filter(t => t.id == sj.taskId).length > 0);
    if (task.length > 0) {
      task[0].task = atoTasks.filter(t => t.id == task[0].taskId)[0];
      return task[0];

    }
    */
    return null;
  }
  public checkEnabled() {
    return false;
    /*
    if (!this.device.tasks)
      return;
    var task = this.device.tasks.filter(t => t.taskTypeId == DeviceScheduleTaskTypes.StartATO)
    return task.length > 0;
    */
  }
  public updateATOProgress() {
    return;
    /*
    var ato = this.atoStatus;
    if (!ato)
      return;
    var start = Date.parse(ato.startTime);
    var estEnd = Date.parse(ato.estimatedEndTime);
    var current = Date.now();

    var totalMs = ato.maxRuntime * 60 * 1000;
    var passedMs = current - start;
    this.currentATOProgress = Math.floor(passedMs / totalMs * 10000) / 100;
    */
  }
  public clickRunATO() {
    //todo
    console.debug("todo open generic perform task modal for StartATO task type");
    return;
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
  public clickRefresh() {
    this.loadATOHistory();
  }
  public loadATOHistory() {
    var expectedCount = this.pagination.count;
    this._aquariumService.getWaterAutoATOsByAquarium(this.aquarium.id, this.pagination).subscribe(atoHistory => {
      this.atoHistory = atoHistory;

      if (atoHistory.length < expectedCount)
        this.hasMore = false;
      else
        this.hasMore = true;
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
    if (nextTask.task.triggerSensorValue == null || !sensor)
      return true;
    return nextTask.task.triggerSensorValue == sensor.value;
  }


  //Misc. methods
  public loadForward() {
    super.loadForward();
    this.loadATOHistory();
  }
  public loadBackward() {
    super.loadBackward();
    this.loadATOHistory();
  }
  //parse date from utc
  public parseDateFromUtc(date: string, timeOnly: boolean = false) {
    return DateFormatProvider.parseDateFromUtc(date, timeOnly);
  }
  public parseDate(date: string) {
    return DateFormatProvider.parseDate(date);
  }
  public parseDuration(date: string) {
    return DateFormatProvider.parseDuration(date);
  }
  public computeTimeDifference(waterATO: ATOStatus) {
    return DateFormatProvider.computeTimeDifference(waterATO.startTime, waterATO.endTime);
  }
  public getRunTime(waterATO: ATOStatus) {
    return DateFormatProvider.getRunTime(waterATO.startTime, waterATO.endTime);
  }
}
