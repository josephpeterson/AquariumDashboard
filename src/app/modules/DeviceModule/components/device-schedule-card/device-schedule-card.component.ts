import { Component, OnInit, Input } from '@angular/core';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { AquariumService } from 'src/app/services/aquarium.service';
import { DeviceSchedule } from 'src/app/models/DeviceSchedule';
import { faTrash, faPenFancy, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import { MatDialog } from '@angular/material/dialog';
import { CreateScheduleModalComponent } from 'src/app/modules/SharedModule/modals/create-schedule-modal/create-schedule-modal.component';
import { SelectScheduleModalComponent } from 'src/app/modules/SharedModule/modals/select-schedule-modal/select-schedule-modal.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'device-schedule-card',
  templateUrl: './device-schedule-card.component.html',
  //styleUrls: ['./device-schedule-card.component.scss']
})
export class DeviceScheduleCardComponent implements OnInit {

  @Input("device") device: AquariumDevice;

  public icon_delete = faTrash;
  public faMinus = faMinus;
  public icon_edit = faPenFancy;
  public faPlus = faPlus;
  public iconStyle = { 'stroke': '#9ed2da', 'color': '#9ed2da' };



  addingSchedule: boolean;
  public newScheduleDeployment: DeviceSchedule;
  managingSchedules: boolean;

  constructor(private _aquariumService: AquariumService,
    private _notifier: NotificationService,
    private _dialog: MatDialog) { }

  ngOnInit() {

  }
  public reloadDeviceSchedules() {
    this._aquariumService.getAquariumDeviceById(this.device.id).subscribe((data: AquariumDevice) => {
      this.device.schedules = data.schedules;
    }, err => {

    })
  }

  public clickCreateSchedule() {
    this.clickUpdateSchedule(new DeviceSchedule());
  }

  public clickDeploySchedule() {
    this.managingSchedules = true;


    this._aquariumService.deploySchedule(this.device.id, this.newScheduleDeployment.id).subscribe((data: DeviceSchedule[]) => {
      this._notifier.notify("success", `Schedule '${this.newScheduleDeployment.name}' deployed to device!`);
      console.debug(data);
      this.device.schedules = data;
      this.managingSchedules = false;

    }, err => {
      this._notifier.notify("error", "Could not deploy schedule to device");
      console.error(err);
      this.managingSchedules = false;

    })
  }

  public clickDeleteSchedule(schedule: DeviceSchedule) {
    this.managingSchedules = true;
    this._aquariumService.deleteDeviceSchedule(this.device.id, schedule.id).subscribe((data: DeviceSchedule[]) => {
      this._notifier.notify("success", `Schedule '${schedule.name}' deleted!`);
      this.managingSchedules = false;
      this.device.schedules = data;
    }, err => {
      this._notifier.notify("error", "Could not remove schedule from device");
      console.error(err);
      this.managingSchedules = false;
    })
  }

  public clickUpdateSchedule(schedule: DeviceSchedule) {

    var dialog = this._dialog.open(CreateScheduleModalComponent, {
      width: "60%",
      data: {
        device: this.device,
        schedule: schedule
      }
    });
    dialog.afterClosed().subscribe(d => {
      this.reloadDeviceSchedules();
    });
  }

  public clickAddSchedule() {
    var dialog = this._dialog.open(SelectScheduleModalComponent, {
      data: this.device
    });
    dialog.afterClosed().subscribe((schedule: DeviceSchedule) => {
      console.log(schedule);
      if (!schedule)
        return; //cancel button


      this._notifier.notify("warning", `Deploying '${schedule.name}' schedule...`);
      this._aquariumService.deploySchedule(this.device.id, schedule.id).subscribe((data: DeviceSchedule[]) => {
        this._notifier.notify("success", `Schedule '${schedule.name}' deployed to device!`);
        this.device.schedules = data;
        //this.managingSchedules = false;
        //this.loadScheduleList();
        //this.reloadDeviceSchedules();

      }, err => {
        this._notifier.notify("error", "Could not deploy schedule to device");
        console.error(err);
        //this.managingSchedules = false;

      })



    });
  }

}
