import { Component, OnInit, Input, Inject } from '@angular/core';
import { DeviceScheduleTask } from 'src/app/models/DeviceScheduleTask';
import { DeviceSchedule } from 'src/app/models/DeviceSchedule';

import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateScheduleTaskModalComponent } from '../create-schedule-task-modal/create-schedule-task-modal.component';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AquariumService } from 'src/app/services/aquarium.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DeviceScheduleTaskAssignment } from 'src/app/models/DeviceScheduleTaskAssignment';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'create-schedule-modal',
  templateUrl: './create-schedule-modal.component.html',
  styleUrls: ['./create-schedule-modal.component.scss']
})
export class CreateScheduleModalComponent implements OnInit {

  @Input("schedule_list") scheduleList: DeviceSchedule[];
  @Input("addingSchedule") addingSchedule;
  public icon_create = faPlus;
  public faTrash = faTrash;



  public disableInput: boolean;


  public device: AquariumDevice;
  public schedule: DeviceSchedule = new DeviceSchedule();


  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private _aquariumService: AquariumService,
    private _notifier: NotificationService,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<CreateScheduleModalComponent>) {
    this.schedule = data.schedule;
    this.device = data.device;
  }

  ngOnInit() {
    if (this.schedule.taskAssignments.length == 0) {
      this.addPlaceholderTask();
    }
    else
      this.expandScheduleObjects();
  }
  public addPlaceholderTask() {
    this.schedule.taskAssignments.push(new DeviceScheduleTaskAssignment());
  }
  public expandScheduleObjects() {
    //map tasks and sensors to respective ids
    var tasks = this.device.tasks;
    var sensors = this.device.sensors;
    this.schedule.taskAssignments.forEach(t => {
      //main task
      var task = tasks.filter(tt => tt.id == t.taskId);
      if (task.length)
        t.task = task[0];

      //trigger task
      var triggerTask = tasks.filter(tt => tt.id == t.triggerTaskId);
      if (triggerTask.length)
        t.triggerTask = triggerTask[0];

      //trigger sensor
      var sensor = sensors.filter(s => s.id == t.triggerSensorId);
      if (sensor.length)
        t.triggerSensor = sensor[0];
    });
  }

  public clickRemoveTask(taId: number) {
    var ta = this.schedule.taskAssignments.filter(ta => ta.id == taId)[0];
    if(ta)
      this.schedule.taskAssignments.splice(this.schedule.taskAssignments.indexOf(ta),1);
  }
  public clickSaveSchedule() {
    this.disableInput = true;

    this.schedule.taskAssignments.forEach(t => {
      if(t.task)
        t.taskId = t.task.id;
      if (t.triggerSensor)
        t.triggerSensorId = t.triggerSensor.id;
      if (t.triggerTask)
        t.triggerTaskId = t.triggerTask.id;
    });
    this._aquariumService.createDeviceSchedule(this.device.id, this.schedule).subscribe((data: DeviceSchedule) => {
      this._dialogRef.close();
    }, err => {
      this.disableInput = false;
      this._notifier.notify("error", "Could not create device schedule...");
      console.error(err);
    });
  }
  public clickDeleteSchedule() {
    this.disableInput = true;
    this._aquariumService.deleteDeviceSchedule(this.device.id, this.schedule.id).subscribe(data => {
      this._dialogRef.close();
    }, err => {
      this.disableInput = false;
      this._notifier.notify("error", "Could not delete device schedule...");
      console.error(err);
    });
  }
  public clickAddTask() {
    this.addPlaceholderTask();
    return;
    this._dialog.open(CreateScheduleTaskModalComponent, {
      data: this.device
    });
  }
}
