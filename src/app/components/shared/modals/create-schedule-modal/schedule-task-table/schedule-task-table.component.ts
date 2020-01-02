import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceScheduleTask } from 'src/app/models/DeviceScheduleTask';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DeviceSchedule } from 'src/app/models/DeviceSchedule';
import { AquariumService } from 'src/app/services/aquarium.service';
import * as moment from 'moment';

@Component({
  selector: 'schedule-task-table',
  templateUrl: './schedule-task-table.component.html',
  styleUrls: ['./schedule-task-table.component.scss']
})
export class ScheduleTaskTableComponent implements OnInit {

  public icon_delete = faTrash;

  public taskTypes: number[] = [];
  public addTaskRepeating: boolean = false;
  addingTask: boolean = true;
  public newTask: DeviceScheduleTask = new DeviceScheduleTask();

  public displayedColumns: string[] = ["task", "startTime", "endTime", "interval", "delete"]
  @Input("schedule") public schedule: DeviceSchedule;


  constructor(private _aquariumService: AquariumService) { }

  ngOnInit() {
    this._aquariumService.getDeviceScheduleTaskTypes().subscribe((data: any) => {
      this.taskTypes = data;
    })
  }


  public clickDeleteTask(task: DeviceScheduleTask) {
    var tasks = this.schedule.tasks;
    var i = tasks.indexOf(task);
    if (i != -1)
      tasks.splice(i, 1);
    this.schedule.tasks = tasks.concat([]);
  }

  public clickAddTask() {
    this.schedule.tasks = this.schedule.tasks.concat([this.newTask]);
    this.newTask = new DeviceScheduleTask();
    this.addingTask = true;

  }


  public parseInterval(interval: number) {
    return moment.duration(interval*1000*60).asMinutes();
  }
  public parseDate(date: string) {
    return moment(date).local().calendar(); 
  }
}
