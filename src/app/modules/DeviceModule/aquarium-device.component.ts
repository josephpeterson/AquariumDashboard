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
import { DeviceInformation } from 'src/app/models/DeviceInformation';
import { AquariumAttemptAuthRenewByAquariumId, AquariumLoadDeployedDeviceByAquaruiumId } from 'src/app/store/aquarium/aquarium.actions';
import { DeviceConnectionStatus } from "src/app/models/types/DeviceConnectionStatus";

@Component({
  selector: 'aquarium-device',
  templateUrl: './aquarium-device.component.html',
  //styleUrls: ['./aquarium-device.component.scss']
})
export class AquariumDeviceComponent implements OnInit {

  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);
  //This is the deployed device information
  public deviceInformation$: Observable<DeviceInformation> = this.store.select(getDeployedDeviceInformation);
  public deviceConnectionStatus$: Observable<DeviceConnectionStatus> = this.store.select(getDeviceConnectionStatus);

  public attemptedRenew: boolean = false;

  constructor(public aquariumService: AquariumService,
    public dialog: MatDialog,
    public store: Store<AppState>
  ) { }
  ngOnInit() {
    this.aquarium$.subscribe(aq => {
      this.store.dispatch(new AquariumLoadDeployedDeviceByAquaruiumId(aq.device.id));
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