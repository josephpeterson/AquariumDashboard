import { Component, OnInit, Input } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';

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


  constructor(public _aquariumService: AquariumService, public notifier: NotificationService) { }

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

  public parseCameraConfiguration() {
    var aquarium: Aquarium = this.deviceInformation.aquarium;
    var config = aquarium.device.cameraConfiguration;

    return this.syntaxHighlight(config);
  }
  private syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
}
