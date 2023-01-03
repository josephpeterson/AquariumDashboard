import { Component, OnInit, Input } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from 'src/app/services/notification.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable } from 'rxjs';
import { selectDeviceInformation } from 'src/app/modules/SharedDeviceModule/store/device.selectors';
import { DeviceInformation } from 'src/app/modules/SharedDeviceModule/models/DeviceInformation';

@Component({
  selector: 'device-information-card',
  templateUrl: './device-information-card.component.html',
  //styleUrls: ['./device-information-card.component.scss']
})
export class DeviceInformationCardComponent implements OnInit {

  public deviceInformation$: Observable<DeviceInformation> = this.store.select(selectDeviceInformation);
  scanning: boolean;

  faCheck = faCheckCircle;
  pinging: boolean;

  constructor(public _aquariumService: AquariumService,
    private store: Store) { }

  ngOnInit() {
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
