import { Component, OnInit, Input } from '@angular/core';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { AquariumService } from 'src/app/services/aquarium.service';
import { DeviceSchedule } from 'src/app/models/DeviceSchedule';
import { faTrash, faPenFancy, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NotifierService } from 'angular-notifier';
import { DeviceScheduleAssignment } from 'src/app/models/DeviceScheduleAssignment';
import { MatDialog } from '@angular/material';
import { CreateScheduleModalComponent } from 'src/app/components/shared/modals/create-schedule-modal/create-schedule-modal.component';
import { AquariumDeviceComponent } from 'src/app/components/containers/AquariumContainer/device/aquarium-device.component';

@Component({
  selector: 'device-schedule-builder',
  templateUrl: './schedule-builder.component.html',
  styleUrls: ['./schedule-builder.component.scss']
})
export class ScheduleBuilderComponent implements OnInit {

  @Input("device") device: AquariumDevice;

  public icon_delete = faTrash;
  public icon_edit = faPenFancy;
  public icon_create = faPlus;


  public schedule_list: DeviceSchedule[] = [];

  addingSchedule: boolean;
  public newScheduleDeployment: DeviceSchedule;
  managingSchedules: boolean;

  constructor(private _aquariumService: AquariumService,
    private _notifier: NotifierService,
    private _dialog: MatDialog) { }

  ngOnInit() {
    this.loadScheduleList();
  }

  public loadScheduleList() {
    this._aquariumService.getDeviceSchedules().subscribe((data: DeviceSchedule[]) => {
      this.schedule_list = data;
    }, err => {

    })
  }
  public reloadDeviceSchedules() {
    this._aquariumService.getAquariumDeviceById(this.device.id).subscribe((data: AquariumDevice) => {
      this.device.scheduleAssignments = data.scheduleAssignments;
    }, err => {

    })
  }

  public clickCreateSchedule() {
    this.clickUpdateSchedule(new DeviceSchedule());
  }

  public clickDeploySchedule() {
    this.managingSchedules = true;


    this._aquariumService.deploySchedule(this.device.id, this.newScheduleDeployment.id).subscribe((data: DeviceScheduleAssignment[]) => {
      this._notifier.notify("success", `Schedule '${this.newScheduleDeployment.name}' deployed to device!`);
      console.log(data);
      this.device.scheduleAssignments = data;
      this.managingSchedules = false;

    }, err => {
      this._notifier.notify("error", "Could not deploy schedule to device");
      console.error(err);
      this.managingSchedules = false;

    })
  }

  public clickRemoveSchedule(schedule: DeviceSchedule) {

    this.managingSchedules = true;

    this._aquariumService.removeSchedule(this.device.id, schedule.id).subscribe((data: DeviceScheduleAssignment[]) => {
      this._notifier.notify("success", `Schedule '${schedule.name}' removed from device!`);
      this.managingSchedules = false;
      this.device.scheduleAssignments = data;
    }, err => {
      this._notifier.notify("error", "Could not remove schedule from device");
      console.error(err);
      this.managingSchedules = false;
    })
  }

  public clickUpdateSchedule(schedule: DeviceSchedule) {

    var dialog = this._dialog.open(CreateScheduleModalComponent, {
      width: "60%"
    });
    dialog.componentInstance.schedule = schedule;
    dialog.afterClosed().subscribe(d => {
      this.loadScheduleList();
      this.reloadDeviceSchedules();
    });
  }

}