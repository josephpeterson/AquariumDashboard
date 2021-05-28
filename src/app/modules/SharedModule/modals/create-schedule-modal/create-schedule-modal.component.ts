import { Component, OnInit, Input } from '@angular/core';
import { DeviceScheduleTask } from 'src/app/models/DeviceScheduleTask';
import { DeviceSchedule } from 'src/app/models/DeviceSchedule';
import { NotifierService } from 'angular-notifier';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { MatDialogRef, MatDialog } from '@angular/material';
import { CreateScheduleTaskModalComponent } from '../create-schedule-task-modal/create-schedule-task-modal.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AquariumService } from 'src/app/services/aquarium.service';

@Component({
  selector: 'create-schedule-modal',
  templateUrl: './create-schedule-modal.component.html',
  styleUrls: ['./create-schedule-modal.component.scss']
})
export class CreateScheduleModalComponent implements OnInit {

  @Input("schedule_list") scheduleList: DeviceSchedule[];
  @Input("addingSchedule") addingSchedule;
  public icon_create = faPlus;



  public disableInput: boolean;

  
  public schedule: DeviceSchedule = new DeviceSchedule();


  constructor(private _aquariumService: AquariumService,
    private _notifier: NotifierService,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<CreateScheduleModalComponent>) { }

  ngOnInit() {
    
  }

  
  public clickSaveSchedule() {
    this.disableInput = true;

    if (this.schedule.id) {
      this._aquariumService.updateDeviceSchedule(this.schedule).subscribe((data: DeviceSchedule) => {
        this._dialogRef.close();
      }, err => {
        this._notifier.notify("error", "Could not create device schedule...");
        console.error(err);
      });
    }
    else
    {
      this._aquariumService.createDeviceSchedule(this.schedule).subscribe((data: DeviceSchedule) => {
        this._dialogRef.close();
      }, err => {
        this.disableInput = false;
        this._notifier.notify("error", "Could not create device schedule...");
        console.error(err);
      });
    }


   
  }
  public clickUpdateSchedule() {
    this.disableInput = true;

    this._aquariumService.updateDeviceSchedule(this.schedule).subscribe(data => {
      this._dialogRef.close();
    }, err => {
      this.disableInput = false;
      this._notifier.notify("error", "Could not update device schedule...");
      console.error(err);
    });
  }
  public clickDeleteSchedule() {
    this.disableInput = true;
    this._aquariumService.deleteDeviceSchedule(this.schedule.id).subscribe(data => {
      this._dialogRef.close();
    }, err => {
      this.disableInput = false;
      this._notifier.notify("error", "Could not delete device schedule...");
      console.error(err);
    });
  }
}
