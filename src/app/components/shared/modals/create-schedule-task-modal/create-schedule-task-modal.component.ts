import { Component, OnInit, Input, Inject } from '@angular/core';
import { DeviceScheduleTask } from 'src/app/models/DeviceScheduleTask';
import { AquariumService } from 'src/app/services/aquarium.service';
import { DeviceSchedule } from 'src/app/models/DeviceSchedule';
import { NotifierService } from 'angular-notifier';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'create-schedule-modal',
  templateUrl: './create-schedule-task-modal.component.html',
  styleUrls: ['./create-schedule-task-modal.component.scss']
})
export class CreateScheduleTaskModalComponent implements OnInit {
  public taskTypes: any[] = [];
  public loading: boolean;

  public newTask:DeviceScheduleTask = new DeviceScheduleTask();
  
  public schedule:DeviceSchedule;


  public startTime:string;
  public endTime:string;
  
  constructor(@Inject(MAT_DIALOG_DATA) private data,
    private _self: MatDialogRef<CreateScheduleTaskModalComponent>,
    private _aquariumService: AquariumService) {
    this.schedule = data;
    this.startTime = "08:00";
    this.endTime = "00:00";
  }


  ngOnInit() {
    
    this.loadTaskTypes();
  }

  loadTaskTypes() {
    this.loading = true;
    this._aquariumService.getDeviceScheduleTaskTypes().subscribe((data: any) => {
      this.loading = false;
      this.taskTypes = data;
      this.newTask.taskId = data[data.length-1].id;
    })
  }
  public clickFinishTask() {
    
    var startDate = this.strToDate(this.startTime);
    var endDate = this.strToDate(this.endTime);

    console.log(startDate,endDate);

    this.newTask.startTime = startDate;
    this.newTask.endTime = endDate;

    this.schedule.tasks.push(this.newTask);

    this._self.close(this.newTask);
  }

  private strToDate(str:string):Date {
    var d = new Date();
    var hours = parseInt(str.split(":")[0]);
    var minutes = parseInt(str.split(":")[1]);
    d.setHours(hours);
    d.setMinutes(minutes);
    return d;
  }
}
