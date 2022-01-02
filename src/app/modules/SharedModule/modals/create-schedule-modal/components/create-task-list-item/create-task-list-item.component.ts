import { Component, Input, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DeviceSchedule } from 'src/app/models/DeviceSchedule';
import { DeviceScheduleTask } from 'src/app/models/DeviceScheduleTask';
import { DeviceScheduleTaskAssignment } from 'src/app/models/DeviceScheduleTaskAssignment';

@Component({
  selector: 'create-task-list-item',
  templateUrl: './create-task-list-item.component.html',
  styleUrls: ['./create-task-list-item.component.scss']
})
export class CreateTaskListItemComponent implements OnInit {

  @Input() taskAssignment: DeviceScheduleTaskAssignment;
  @Input() schedule: DeviceSchedule;
  @Input() disabled: boolean;
  public faTrash = faTrash;

  public filters = [
    { name: "Sunday", value: true },
    { name: "Monday", value: true },
    { name: "Tuesday", value: true },
    { name: "Wednesday", value: true },
    { name: "Thursday", value: true },
    { name: "Friday", value: true },
    { name: "Saturday", value: true },
  ];

  constructor() { }

  ngOnInit() {
    //apply filters based on task assignment
    if(this.taskAssignment.dateConditions && this.taskAssignment.dateConditions.length == 7)
      this.filters.forEach((f,i) => {
        if(this.taskAssignment.dateConditions[i] == "1")
          f.value = true;
        else
          f.value = false;
      });
  }
  public updateFilters() {
    this.taskAssignment.dateConditions = "";
    this.filters.forEach(f => {
      this.taskAssignment.dateConditions += f.value ? "1":"0";
    });
  }
  public getDateConditionText() {
    var fs = this.filters.filter(f => f.value);
    if(fs.length == 7)
      return "This task will run every day";
    if(fs.length == 1)
      return `This task will run every ${fs[0].name}`;
    return `This task will run ${fs.length} times a week`;
  }
  public getUniqueClass() {
    return this.schedule.taskAssignments.indexOf(this.taskAssignment);
  }
}
