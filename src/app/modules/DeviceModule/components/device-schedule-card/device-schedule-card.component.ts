import { Component, OnInit, Input } from '@angular/core';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { AquariumService } from 'src/app/services/aquarium.service';
import { DeviceSchedule } from 'src/app/models/DeviceSchedule';
import { faTrash, faPenFancy, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import { MatDialog } from '@angular/material/dialog';
import { CreateScheduleModalComponent } from 'src/app/modules/SharedModule/modals/create-schedule-modal/create-schedule-modal.component';
import { SelectScheduleModalComponent } from 'src/app/modules/SharedModule/modals/select-schedule-modal/select-schedule-modal.component';
import { NotificationService } from 'src/app/services/notification.service';
import { AquariumLoadByIdAction, AquariumLoadDeployedDeviceByAquaruiumId, AquariumSelectionAction } from 'src/app/store/aquarium/aquarium.actions';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'device-schedule-card',
  templateUrl: './device-schedule-card.component.html',
  //styleUrls: ['./device-schedule-card.component.scss']
})
export class DeviceScheduleCardComponent {

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
    private store: Store<AppState>,
    private _dialog: MatDialog) { }

  public reloadDeviceSchedules() {
    this.store.dispatch(new AquariumSelectionAction(this.device.aquariumId));
    this.store.dispatch(new AquariumLoadDeployedDeviceByAquaruiumId(this.device.id));
  }
  public clickCreateSchedule() {
    this.clickUpdateSchedule(new DeviceSchedule());
  }
  public clickDeleteSchedule(schedule: DeviceSchedule) {
    this.managingSchedules = true;
    this._aquariumService.deleteDeviceSchedule(this.device.id, schedule.id).subscribe((data: DeviceSchedule[]) => {
      this._notifier.notify("success", `Schedule '${schedule.name}' deleted!`);
      this.managingSchedules = false;
      this.reloadDeviceSchedules();
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
      if(d)
        this.reloadDeviceSchedules();
    });
  }
}
