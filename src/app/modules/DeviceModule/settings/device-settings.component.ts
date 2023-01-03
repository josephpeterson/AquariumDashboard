import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AquariumService } from 'src/app/services/aquarium.service';
import { Aquarium } from 'src/app/models/Aquarium';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { Observable } from 'rxjs';
import { selectDeviceInformation } from '../../SharedDeviceModule/store/device.selectors';
import { DeviceInformation } from '../../SharedDeviceModule/models/DeviceInformation';


@Component({
  selector: 'device-settings',
  templateUrl: './device-settings.component.html',
  styleUrls: ['./device-settings.component.scss']
})
export class DeviceSettingsComponent {
  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);
  public deviceInformation$: Observable<DeviceInformation> = this.store.select(selectDeviceInformation);
  deviceLog: any;

  constructor(public aquariumService: AquariumService,
    public dialog: MatDialog,
    public store: Store
  ) { }
}
