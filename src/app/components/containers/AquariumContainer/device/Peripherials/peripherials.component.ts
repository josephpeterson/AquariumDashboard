import { Component, OnInit, Input } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { NotifierService } from 'angular-notifier';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'device-peripherials',
  templateUrl: './peripherials.component.html',
  styleUrls: ['./peripherials.component.scss']
})
export class DevicePeripherialsComponent implements OnInit {

  @Input("aquarium") public aquarium: Aquarium;
  scanning: boolean;

  faCheck = faCheckCircle;
  pinging: boolean;


  constructor(public _aquariumService: AquariumService,public notifier:NotifierService) { }

  ngOnInit() {
  }

  clickScanDeviceHardware() {
    this.scanning = true;
    this._aquariumService.scanDeviceHardware(this.aquarium.device.id).subscribe(
      (device: AquariumDevice) => {
        console.log(device);
        this.aquarium.device = device;
        this.scanning = false;
      }, err => {
        this.scanning = false;
        this.notifier.notify("error", "Check Device Hardware Failed");
      })
  }
  clickPingDevice() {
    this.pinging = true;
    this._aquariumService.pingDevice(this.aquarium.device.id).subscribe(
        () => {
            this.pinging = false;
            this.notifier.notify("success", "Connection to device was successfull");
        }, err => {
            this.pinging = false;
            this.notifier.notify("error", "Could not connect to device");
        })
}
}
