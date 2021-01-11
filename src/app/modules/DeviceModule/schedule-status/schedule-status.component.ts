import { Component, OnInit, Input } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { NotifierService } from 'angular-notifier';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { DeviceScheduleState } from 'src/app/models/DeviceScheduleState';
import * as moment from 'moment';
import { DeviceScheduleTask } from 'src/app/models/DeviceScheduleTask';

@Component({
  selector: 'device-schedule-status',
  templateUrl: './schedule-status.component.html',
  styleUrls: ['./schedule-status.component.scss']
})
export class DeviceScheduleStatusComponent implements OnInit {

  @Input("device") public device: AquariumDevice;
  scanning: boolean;

  faCheck = faCheckCircle;
  pinging: boolean;
  scheduleState: DeviceScheduleState;
  performingTask: boolean;


  constructor(public _aquariumService: AquariumService, public notifier: NotifierService) { }

  ngOnInit() {
  }

  clickGetDeviceScheduleStatus() {
    this.scanning = true;
    this._aquariumService.getDeviceScheduleStatus(this.device.id).subscribe(
      (scheduleState: DeviceScheduleState) => {
        console.log(scheduleState);
        this.scheduleState = scheduleState;
      }, err => {
        this.scanning = false;
        this.notifier.notify("error", "Could not retrieve device information");
      })
  }
  clickPerformTask(task: DeviceScheduleTask) {
    this.performingTask = true;
    this._aquariumService.performScheduleTask(this.device.id,task).subscribe(
      (data) => {
        this.performingTask = false;
        this.notifier.notify("success", "Task was performed successfully!");
      }, err => {
        this.performingTask = false;
        this.notifier.notify("error", "Could not perform task on device");
      })
  }
  public readableDuration(timespan: string) {
    return moment.duration(timespan).humanize();
  }
  
}
