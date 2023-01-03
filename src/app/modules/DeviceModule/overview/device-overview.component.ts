import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AquariumService } from 'src/app/services/aquarium.service';
import { Aquarium } from 'src/app/models/Aquarium';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getDeployedDeviceInformation, getDeviceConnectionStatus, getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { DeviceConnectionStatus } from 'src/app/models/types/DeviceConnectionStatus';
import { DeviceInformation } from '../../SharedDeviceModule/models/DeviceInformation';
import { selectDeviceInformation } from '../../SharedDeviceModule/store/device.selectors';

@Component({
  selector: 'device-overview',
  templateUrl: './device-overview.component.html',
  //styleUrls: ['./device-overview.component.scss']
})
export class DeviceOverviewComponent {
  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);
  public deviceInformation$: Observable<DeviceInformation> = this.store.select(selectDeviceInformation);
  public deviceConnectionStatus$: Observable<DeviceConnectionStatus> = this.store.select(getDeviceConnectionStatus);
  public device: AquariumDevice;
  deviceLog: any;

  constructor(public aquariumService: AquariumService,
    public dialog: MatDialog,
    public store: Store
  ) {
  }
}
