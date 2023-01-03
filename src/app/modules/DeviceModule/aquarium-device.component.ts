import { Component, OnInit } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getDeployedDeviceInformation, getDeviceConnectionStatus, getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { AquariumAttemptAuthRenewByAquariumId, AquariumLoadDeployedDeviceByAquaruiumId } from 'src/app/store/aquarium/aquarium.actions';
import { DeviceConnectionStatus } from "src/app/models/types/DeviceConnectionStatus";
import { AquariumDeviceService } from '../SharedDeviceModule/aquarium-device.service';
import { connectToDevice } from '../SharedDeviceModule/store/device.actions';
import { selectConfiguredDevice, selectDeviceInformation } from '../SharedDeviceModule/store/device.selectors';
import { DeviceInformation } from '../SharedDeviceModule/models/DeviceInformation';

@Component({
  selector: 'aquarium-device',
  templateUrl: './aquarium-device.component.html',
  //styleUrls: ['./aquarium-device.component.scss']
})
export class AquariumDeviceComponent implements OnInit {

  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);
  //This is the deployed device information
  public deviceInformation$: Observable<DeviceInformation> = this.store.select(selectDeviceInformation);
  public deviceConnectionStatus$: Observable<DeviceConnectionStatus> = this.store.select(getDeviceConnectionStatus);

  public attemptedRenew: boolean = false;

  constructor(public aquariumService: AquariumService,
    public aquariumDeviceService: AquariumDeviceService,
    public dialog: MatDialog,
    public store: Store
  ) { }
  ngOnInit() {
    this.aquarium$.subscribe(aq => {
      this.store.dispatch(connectToDevice());
      this.deviceConnectionStatus$.subscribe((status: DeviceConnectionStatus) => {
        if (status == DeviceConnectionStatus.Connected && !this.attemptedRenew) //connected but not tested
        {
          this.attemptedRenew = true;
          this.store.dispatch(new AquariumAttemptAuthRenewByAquariumId(aq.device.id));
        }
      });
    });

  }
}