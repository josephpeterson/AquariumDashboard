import { Component, OnInit, Input } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { DeviceScheduleState } from 'src/app/models/DeviceScheduleState';
import * as moment from 'moment';
import { DeviceScheduleTask, DeviceScheduleTaskTypes } from 'src/app/models/DeviceScheduleTask';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'device-schedule-tasks',
  templateUrl: './schedule-tasks.component.html',
  styleUrls: ['./schedule-tasks.component.scss']
})
export class DeviceScheduleTasksComponent implements OnInit {

  @Input("device") public device: AquariumDevice;
  scanning: boolean;

  faCheck = faCheckCircle;
  pinging: boolean;
  scheduleState: DeviceScheduleState;
  performingTask: boolean;


  constructor(public _aquariumService: AquariumService, public notifier: NotificationService) { }

  ngOnInit() {
    console.log("wat",this.device);
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
        this.notifier.notify("error", "Task: " + err.error);
      })
  }
  public readableDuration(task: DeviceScheduleTask) {
    var d = moment(task.startTime).diff(moment());
    return moment.duration(d).humanize();
  }
  public readableDate(date: string) {
    return moment(date).local().calendar();
  }
  public getTaskNameFromId = DeviceScheduleTask.getTaskNameFromId;
  
}
