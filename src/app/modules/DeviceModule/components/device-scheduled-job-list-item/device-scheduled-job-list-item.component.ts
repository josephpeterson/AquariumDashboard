import { Component, OnInit, Input } from '@angular/core';
import { AquariumService } from 'src/app/services/aquarium.service';

import { DeviceSensor } from 'src/app/modules/SharedDeviceModule/models/DeviceSensor';
import { faChargingStation, faMinusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from 'src/app/services/notification.service';
import { DeviceScheduledJob } from 'src/app/modules/SharedDeviceModule/models/DeviceScheduledJob';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { JobStatus } from 'src/app/models/types/JobStatus';
import * as moment from 'moment';
import { GpioPinValue } from 'src/app/models/types/GpioPinValue';
import { AquariumLoadByIdAction, AquariumLoadDeployedDeviceByAquaruiumId, AquariumSelectionAction } from 'src/app/store/aquarium/aquarium.actions';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { JobEndReason } from 'src/app/models/types/JobEndReason';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'device-scheduled-job-list-item',
  templateUrl: './device-scheduled-job-list-item.component.html',
  styleUrls: ['./device-scheduled-job-list-item.component.scss']
})
export class DeviceScheduledJobListItemComponent implements OnInit {

  @Input("device") device: AquariumDevice;
  @Input("scheduledJob") scheduledJob: DeviceScheduledJob;

  public currentScheduledJobProgress: number;
  public updateTick;
  public faMinusCircle = faMinusCircle;

  constructor(public _aquariumService: AquariumService,
    public store: Store<AppState>,
    public notifier: ToastrService) { }

  ngOnInit() {
    this.updateTick = setInterval(() => this.updateScheduledJobProgress(), 100);
  }
  public getSensorFromId(id: number) {
    var sensor = this.device.sensors.find(s => s.id == id);
    return sensor;
  }
  public getStatusFromJob(job: DeviceScheduledJob) {
    return JobStatus[job.status].toString();
  }
  public getEndReasonFromJob(job: DeviceScheduledJob) {
    return JobEndReason[job.endReason].toString();
  }
  public getSensorValueFromId(id: number) {
    return GpioPinValue[id].toString();
  }
  public isJobRunning(job: DeviceScheduledJob) {
    return job.status == JobStatus.Running;
  }
  public isJobCompleted(job: DeviceScheduledJob) {
    return job.status == JobStatus.Completed;
  }
  public clickStopScheduledJob(job: DeviceScheduledJob) {
    this._aquariumService.stopScheduledJob(this.device.id, job).subscribe(
      () => {
        this.notifier.success( "Scheduled job stopped job id: " + job.id);
        //this.store.dispatch(new AquariumLoadDeployedDeviceByAquaruiumId(this.device.id));
      }, err => {
        this.notifier.error( "Could not stop scheduled job");
      })
  }
  public getTaskFromJob(job: DeviceScheduledJob) {
    if (job.task) return job.task;
    var task = this.device.tasks.filter(t => t.id == job.taskId)[0];
    return task;
  }
  public readableDuration(time: string) {
    var d = moment(time).diff(moment());
    return moment.duration(d).humanize();
  }
  public readableDurationLength(startTime: string, endTime: string) {
    var d = moment(endTime).diff(moment(startTime));
    return moment.duration(d).humanize();
  }
  public readableTimestamp(time: string) {
    return moment(time).local().format("LT");
  }
  public readableDateTimestamp(time: string) {
    return moment(time).utc().local().calendar();
  }
  public onScheduledJobCompleted() {
    //this.store.dispatch(new AquariumLoadDeployedDeviceByAquaruiumId(this.device.id));
    this.notifier.success( "Schedule job completed! ID: " + this.scheduledJob.id);
    this.scheduledJob.status = JobStatus.Pending; //this will get overritten
  }

  public updateScheduledJobProgress() {
    if (!this.scheduledJob || this.scheduledJob.status != JobStatus.Running) {
      clearInterval(this.updateTick);
      return;
    }
    if (this.currentScheduledJobProgress > 100) {
      clearInterval(this.updateTick);
      this.onScheduledJobCompleted();
      return;
    }
    var job = this.scheduledJob;
    var start = Date.parse(job.startTime);
    var estEnd = Date.parse(job.maximumEndTime);
    var total = moment(estEnd).diff(start);
    var runtime = moment().diff(start);
    this.currentScheduledJobProgress = Math.floor(runtime / total * 100);
  }
}
