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
import { retry } from 'rxjs/operators';

@Component({
  selector: 'device-gpio-card',
  templateUrl: './device-gpio-card.component.html',
  styleUrls: ['./device-gpio-card.component.scss']
})
export class DeviceGpioCardComponent implements OnInit {
  @Input() public device: AquariumDevice;
  public GpioPinTypes: typeof GpioPinTypes = GpioPinTypes;
  public newDeviceSensor: DeviceSensor = new DeviceSensor();
  public loading: boolean = false;
  public error: string;

  constructor(private _aquariumService: AquariumService) {
  }
  ngOnInit() {
  }
  isPortDisabled(portType: GpioPinTypes) {
    return portType == GpioPinTypes.pwr3V || portType == GpioPinTypes.pwr5V || portType == GpioPinTypes.Ground
  }
  isPortUsed(portType: GpioPinTypes): DeviceSensor {
    //check if port is in use
    var used;
    var truePinValue = this.getTruePinValue(portType);
    if(this.device.sensors)
      this.device.sensors.forEach(s => {
        if (s.pin == truePinValue && s.id != this.newDeviceSensor.id)
        {
          used = true;
          used = s;
        }
    });
    return used;
  }
  clickGpioPort(port: GpioPinTypes) {
    return;
    if (this.isPortDisabled(port))
      return;
    this.newDeviceSensor.pin = this.getTruePinValue(port);
  }
  getGpioConfiguration(model: string) {
    for (var i = 0; i < RaspberryPiModels.length; i++) {
      var m = RaspberryPiModels[i];
      if (m.name == model)
        return m.gpioConfiguration;
    }
    return;
  }
  getTruePinValue(port: GpioPinTypes) {
    return this.getGpioConfiguration(this.device.type).indexOf(port) + 1
  }
  isSelected(gpio: GpioPinTypes) {
    return this.getGpioConfiguration(this.device.type).indexOf(gpio) == this.newDeviceSensor.pin-1;
  }
  getGpioRow2(model: string) {
    for (var i = 0; i < RaspberryPiModels.length; i++) {
      var m = RaspberryPiModels[i];
      if (m.name == model)
        return m.gpioConfiguration.filter((x, i) => i % 2 == 0);
    }
    return;
  }
  getGpioRow1(model: string) {
    for (var i = 0; i < RaspberryPiModels.length; i++) {
      var m = RaspberryPiModels[i];
      if (m.name == model)
        return m.gpioConfiguration.filter((x, i) => i % 2 == 1);
    }
    return;
  }
  getGpioToolTip(pin: GpioPinTypes) {
    var str = "Gpio Pin: " + pin;

    var sensor = this.isPortUsed(pin);
    if(sensor)
      str += "\n" + sensor.name;
    return str;
  }
}
