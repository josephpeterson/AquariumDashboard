import { Component, OnInit } from '@angular/core';
import { AquariumService } from 'src/app/services/aquarium.service';

import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { Store } from '@ngrx/store';
import { AquariumDeviceService } from '../../SharedDeviceModule/aquarium-device.service';
import { DeviceInformation } from '../../SharedDeviceModule/models/DeviceInformation';
import { selectDeviceInformation } from '../../SharedDeviceModule/store/device.selectors';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'device-sensors',
  templateUrl: './sensors.component.html',
  //styleUrls: ['./sensors.component.scss']
})
export class DeviceSensorsComponent {
  public deviceInformation$: Observable<DeviceInformation> = this.store.select(selectDeviceInformation);

  constructor(public _aquariumService: AquariumService,
    public _aquariumDeviceService: AquariumDeviceService,
    public notifier: ToastrService,
    public store: Store,
    public dialog: MatDialog) { }
}
