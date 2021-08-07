import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceScheduleTask } from 'src/app/models/DeviceScheduleTask';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DeviceSchedule } from 'src/app/models/DeviceSchedule';
import { AquariumService } from 'src/app/services/aquarium.service';
import * as moment from 'moment';
import { CreateScheduleTaskModalComponent } from '../modals/create-schedule-task-modal/create-schedule-task-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'schedule-task-table',
  templateUrl: './schedule-task-table.component.html',
  styleUrls: ['./schedule-task-table.component.scss']
})
export class ScheduleTaskTableComponent implements OnInit {

  public icon_delete = faTrash;
  public icon_create = faPlus;

  public loading: boolean = false;

  public taskTypes: any[] = [];
  public startTimes: any[] = [];
  public endTimes: any[] = [];
  public addTaskRepeating: boolean = false;
  addingTask: boolean = true;
  public newTask: DeviceScheduleTask = new DeviceScheduleTask();

  public displayedColumns: string[] = ["task", "startTime", "endTime", "interval", "delete"]
  @Input("schedule") public schedule: DeviceSchedule;


  constructor(private _aquariumService: AquariumService,
    private _dialog: MatDialog,
  ) { }

  ngOnInit() {
    this._aquariumService.getDeviceScheduleTaskTypes().subscribe((data: any) => {
      this.taskTypes = data;
    })

    this.convertTimestamps();
  }


  private convertTimestamps() {
    this.schedule.tasks.forEach((t, i) => {
      this.startTimes[i] = this.dateToStrTime(t.startTime);
      this.endTimes[i] = this.dateToStrTime(t.endTime);
    });
  }

  public clickDeleteTask(task: DeviceScheduleTask) {
    var tasks = this.schedule.tasks;
    var i = tasks.indexOf(task);
    if (i != -1)
      tasks.splice(i, 1);
    this.schedule.tasks = tasks.concat([]);
  }

  public clickAddTask() {
    var dialog = this._dialog.open(CreateScheduleTaskModalComponent, {
      data: this.schedule
    });
    dialog.afterClosed().subscribe((task: DeviceScheduleTask) => {
      //Dont do anything?
      if (task) {
        this.schedule.tasks.push(task);
        console.log(task);
      }
      console.log(this.schedule.tasks);
      this.convertTimestamps();
    })
  }


  public parseInterval(interval: number) {
    return moment.duration(interval * 1000 * 60).asMinutes();
  }

  public getTaskName(taskId: number) {
    var task = this.taskTypes[taskId];
    if (task)
      return task.name;
    return "";
  }
  /* Time utilities */
  public dateToStrTime(date) {
    var d = moment.utc(date).local();

    var hours = d.hour().toString();
    var minutes = d.minute().toString();

    if (hours.length < 2)
      hours = "0" + hours;
    if (minutes.length < 2)
      minutes = "0" + minutes;
    var str = hours + ":" + minutes;
    return str;
  }
  private strToDate(str: string) {
    var d = new Date();
    var hours = parseInt(str.split(":")[0]);
    var minutes = parseInt(str.split(":")[1]);
    d.setHours(hours);
    d.setMinutes(minutes);
    return d;
  }
  //Bind to time stuff...
  public updateTasks() {
    this.schedule.tasks.forEach((t, i) => {
      t.startTime = this.strToDate(this.startTimes[i]);
      t.endTime = this.strToDate(this.endTimes[i]);
    });
  }

  public toggleRepeat(task: DeviceScheduleTask, value) {
    if (value)
      task.interval = 5;
    else
      task.interval = null;

    console.log(task.interval);
  }
  public getAllTasks() {
    this.schedule.tasks = this.schedule.tasks.sort((a, b) => {
      var aT = new Date(a.startTime);
      var bT = new Date(b.startTime);
      var aTotal = aT.getHours() * 60 + aT.getMinutes();
      var bTotal = bT.getHours() * 60 + bT.getMinutes();
      return aTotal < bTotal ? -1 : 0;
    });

    this.convertTimestamps();
    return this.schedule.tasks;
  }
}
