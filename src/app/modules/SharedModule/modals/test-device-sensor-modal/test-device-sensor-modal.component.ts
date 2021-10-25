import { Component, OnInit, Input, Inject } from '@angular/core';
import { DeviceScheduleTask } from 'src/app/models/DeviceScheduleTask';
import { DeviceSchedule } from 'src/app/models/DeviceSchedule';

import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { AquariumService } from 'src/app/services/aquarium.service';
import { GpioPinTypes } from '../../../../models/GpioPinTypes';
import { RaspberryPi3ModelB } from '../../../../models/RaspberryPi3ModelB';
import { DeviceSensor } from 'src/app/models/DeviceSensor';
import { RaspberryPiModels } from 'src/app/models/types/RaspberyPiModels';
import { HttpErrorResponse } from '@angular/common/http';
import { DeviceSensorTestRequest } from 'src/app/models/DeviceSensorTestRequest';
import { NotificationService } from 'src/app/services/notification.service';
import { BaseException } from 'src/app/models/BaseException';

@Component({
  selector: 'test-device-sensor-modal',
  templateUrl: './test-device-sensor-modal.component.html',
  styleUrls: ['./test-device-sensor-modal.component.scss']
})
export class TestDeviceSensorModalComponent implements OnInit {
  public sensor: DeviceSensor = new DeviceSensor();
  public device: AquariumDevice = new AquariumDevice();
  public request: DeviceSensorTestRequest = new DeviceSensorTestRequest();
  public loading: boolean = false;
  public error: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data,
    private _self: MatDialogRef<TestDeviceSensorModalComponent>,
    private notifier: NotificationService,
    private _aquariumService: AquariumService) {
  }
  ngOnInit() {
    this.request.sensorId = this.sensor.id;
    this.request.deviceId = this.device.id;
  }
  public clickRunTest() {
    this._aquariumService.testDeviceSensor(this.request).subscribe(
      (request: DeviceSensorTestRequest) => {
        this.notifier.notify("success", `Successfully ran test for sensor: ${this.sensor.name}`);
      }, (err: HttpErrorResponse) => {
        var error = err.error as BaseException;
        console.log(error);
        this.notifier.notify("error", `Could not run test for device sensor. ${error.message}`);
      })
    this._self.close();
  }
}
