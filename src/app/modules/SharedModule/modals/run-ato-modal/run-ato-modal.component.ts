import { Component, OnInit, Input, Inject } from '@angular/core';
import { DeviceScheduleTask } from 'src/app/models/DeviceScheduleTask';
import { DeviceSchedule } from 'src/app/models/DeviceSchedule';
import { NotifierService } from 'angular-notifier';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import { AquariumService } from 'src/app/services/aquarium.service';
import { GpioPinTypes } from '../../../../models/GpioPinTypes';
import { RaspberryPi3ModelB } from '../../../../models/RaspberryPi3ModelB';
import { DeviceSensor } from 'src/app/models/DeviceSensor';
import { RaspberryPiModels } from 'src/app/models/types/RaspberyPiModels';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'run-ato-modal',
  templateUrl: './run-ato-modal.component.html',
  styleUrls: ['./run-ato-modal.component.scss']
})
export class RunATOModalComponent implements OnInit {

  public runtime: number;
  constructor(@Inject(MAT_DIALOG_DATA) private data,
    private _self: MatDialogRef<RunATOModalComponent>,
    private _aquariumService: AquariumService) {
  }
  ngOnInit() {
  }
}
