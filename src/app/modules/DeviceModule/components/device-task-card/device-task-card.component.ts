import { Component, OnInit, Input } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';

import { faCheckCircle, faEdit, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DeviceScheduleState } from 'src/app/models/DeviceScheduleState';
import * as moment from 'moment';
import { DeviceScheduleTask } from 'src/app/models/DeviceScheduleTask';
import { DeviceScheduleTaskTypes } from "src/app/models/types/DeviceScheduleTaskTypes";
import { NotificationService } from 'src/app/services/notification.service';
import { DeviceSchedule } from 'src/app/models/DeviceSchedule';
import { MatDialog } from '@angular/material/dialog';
import { CreateScheduleTaskModalComponent } from 'src/app/modules/SharedModule/modals/create-schedule-task-modal/create-schedule-task-modal.component';
import { ConfirmModalComponent } from 'src/app/modules/SharedModule/modals/confirm-modal/confirm-modal.component';
import { take } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { AquariumLoadDeployedDeviceByAquaruiumId } from 'src/app/store/aquarium/aquarium.actions';

@Component({
  selector: 'device-task-card',
  templateUrl: './device-task-card.component.html',
  styleUrls: ['./device-task-card.component.scss']
})
export class DeviceTaskCardComponent implements OnInit {

  @Input("device") public device: AquariumDevice;
  scanning: boolean;

  faMinus = faMinus;
  faEdit = faEdit;
  faTrash = faTrash;
  pinging: boolean;
  scheduleState: DeviceScheduleState;
  performingTask: boolean;
  taskNames: any[];
  
  public faPlus = faPlus;


  constructor(public _aquariumService: AquariumService,
    public _dialog: MatDialog,
    public store: Store<AppState>,
    public notifier: NotificationService) { }

  ngOnInit() {
    this._aquariumService.getSelectOptionsByType("DeviceTaskTypes").subscribe((data: any[]) => {
      this.taskNames = data;
    });
  }

  clickPerformTask(task: DeviceScheduleTask) {
    this.performingTask = true;
    this._aquariumService.performScheduleTask(task.deviceId, task).subscribe(
      (data) => {
        this.performingTask = false;
        this.notifier.notify("success", "Task was performed successfully!");
      }, err => {
        this.performingTask = false;
        this.notifier.notify("error", "Task: " + err.error);
      })
  }
  public clickAddTask() {
    var dialog = this._dialog.open(CreateScheduleTaskModalComponent, {
      data: {
        device: this.device
      }
    });
    dialog.afterClosed().subscribe((task: DeviceScheduleTask) => {
      if(task)
      {
        this.device.tasks.splice(0,0,task);
        this.notifier.notify("success", "New task created successfully");
        this.store.dispatch(new AquariumLoadDeployedDeviceByAquaruiumId(this.device.id));
      }
    })
  }
  public clickUpdateTask(task: DeviceScheduleTask) {

    var dialog = this._dialog.open(CreateScheduleTaskModalComponent, {
      data: {
        device: this.device,
        task: {...task}
      }
    });
    dialog.afterClosed().subscribe(d => {
      if(d)
      {
        this.device.tasks.splice(this.device.tasks.indexOf(task),1,d);
        this.notifier.notify("success", "Task updated successfully");
        this.store.dispatch(new AquariumLoadDeployedDeviceByAquaruiumId(this.device.id));
      }
    });
  }
  public clickDeleteTask(task: DeviceScheduleTask) {
    var dialog = this._dialog.open(ConfirmModalComponent, {
    });
    dialog.componentInstance.title = "Delete Task";
    dialog.componentInstance.body = "Are you sure you would like to delete this task?";

    dialog.afterClosed().pipe(take(1)).subscribe((confirm: boolean) => {
      if (confirm) {
        this._aquariumService.deleteDeviceTask(this.device.id,task.id).subscribe(() => {
          this.device.tasks.splice(this.device.tasks.indexOf(task),1);
          this.notifier.notify("success","Task deleted");
          this.store.dispatch(new AquariumLoadDeployedDeviceByAquaruiumId(this.device.id));
        },err => {
          this.notifier.notify("error","Could not delete task");
        })
      }
    });
  }
  public readableDuration(task: DeviceScheduleTask) {
    return;
    /*
    var d = moment(task.startTime).diff(moment());
    return moment.duration(d).humanize();
    */
  }
  public readableDate(date: string) {
    return moment(date).local().calendar();
  }
}
