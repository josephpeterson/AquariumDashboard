import { Component, OnInit, Input } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { NotifierService } from 'angular-notifier';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'device-information',
  templateUrl: './device-information.component.html',
  styleUrls: ['./device-information.component.scss']
})
export class DeviceInformationComponent implements OnInit {

  @Input("aquarium") public aquarium: Aquarium;
  scanning: boolean;

  faCheck = faCheckCircle;
  pinging: boolean;
  deviceInformation: any;


  constructor(public _aquariumService: AquariumService, public notifier: NotifierService) { }

  ngOnInit() {
  }

  clickGetDeviceInformation() {
    console.log(this.aquarium);
    this.scanning = true;
    this._aquariumService.getDeviceInformation(this.aquarium.device.id).subscribe(
      (deviceInformation) => {
        console.log(deviceInformation);
        this.deviceInformation = deviceInformation;
      }, err => {
        this.scanning = false;
        this.notifier.notify("error", "Could not retrieve device information");
      })
  }

}
