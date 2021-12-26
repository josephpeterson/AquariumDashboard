import { Component, OnInit, Input, Inject } from '@angular/core';
import { DeviceScheduleTask } from 'src/app/models/DeviceScheduleTask';
import { DeviceSchedule } from 'src/app/models/DeviceSchedule';

import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { AquariumService } from 'src/app/services/aquarium.service';
import { DeviceSensor } from 'src/app/models/DeviceSensor';

@Component({
  selector: 'create-schedule-modal',
  templateUrl: './create-schedule-task-modal.component.html',
  styleUrls: ['./create-schedule-task-modal.component.scss']
})
export class CreateScheduleTaskModalComponent implements OnInit {
  public loading: boolean;
  public error: string;

  public newTask: DeviceScheduleTask = new DeviceScheduleTask();
  public device: AquariumDevice;

  public readSensorChecked: boolean;
  public maxRunTimeChecked: boolean;

  public startTime: string;
  public endTime: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data,
    private _self: MatDialogRef<CreateScheduleTaskModalComponent>,
    private _aquariumService: AquariumService) {
    if (data.task)
      this.newTask = data.task;
    this.device = data.device;


    if(this.newTask.triggerSensorId != null)
    {
      this.newTask.triggerSensor = this.device.sensors.filter(s => s.id == this.newTask.triggerSensorId)[0];
      this.readSensorChecked = true;
    }

    if (this.newTask.targetSensor == null)
      this.newTask.targetSensor = new DeviceSensor();
    if (this.newTask.triggerSensor == null)
      this.newTask.triggerSensor = new DeviceSensor();

  }
  ngOnInit() {
  }
  public clickFinishTask() {
    this.validate();
    if (this.error) return;

    this.loading = true;

    //set up data
    this.newTask.targetSensorId = this.newTask.targetSensor.id;
    if (this.readSensorChecked)
      this.newTask.triggerSensorId = this.newTask.triggerSensor.id;

    this._aquariumService.createDeviceTask(this.device.id, this.newTask).subscribe(deviceTask => {
      this._self.close(deviceTask);
      this.loading = false;
    },
      err => {
        console.error("Error creating new device task:", err);
        this.loading = false;
      });
  }
  public validate() {
    delete this.error;
    if (this.newTask.targetSensor == null)
      return this.error = "Please select a valid sensor";
    return true;
  }
}
