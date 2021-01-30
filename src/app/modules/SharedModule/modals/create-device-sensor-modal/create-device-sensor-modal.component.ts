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
  selector: 'create-device-sensor-modal',
  templateUrl: './create-device-sensor-modal.component.html',
  styleUrls: ['./create-device-sensor-modal.component.scss']
})
export class CreateDeviceSensorModalComponent implements OnInit {
  public device: AquariumDevice;
  public GpioPinTypes: typeof GpioPinTypes = GpioPinTypes;
  public newDeviceSensor: DeviceSensor = new DeviceSensor();
  public loading: boolean = false;
  public error: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data,
    private _self: MatDialogRef<CreateDeviceSensorModalComponent>,
    private _aquariumService: AquariumService) {
  }
  ngOnInit() {
  }
  isPortDisabled(portType: GpioPinTypes) {
    return portType == GpioPinTypes.pwr3V || portType == GpioPinTypes.pwr5V || portType == GpioPinTypes.Ground
  }
  clickGpioPort(port: GpioPinTypes) {
    if (this.isPortDisabled(port))
      return;
    this.newDeviceSensor.pin = port;
  }
  clickCreateSensor() {
    this.loading = true;
    delete this.error;
    this._aquariumService.createDeviceSensor(this.device.id, this.newDeviceSensor).subscribe(res => {
      this.loading = false;
      this._self.close(this.newDeviceSensor);
    }, (err:HttpErrorResponse) => {
      this.loading = false;
      this.error = err.message;
    });
  }
  getGpioConfiguration(model: string) {
    for (var i = 0; i < RaspberryPiModels.length; i++) {
      var m = RaspberryPiModels[i];
      if (m.name == model)
        return m.gpioConfiguration;
    }
    return;
  }
}
