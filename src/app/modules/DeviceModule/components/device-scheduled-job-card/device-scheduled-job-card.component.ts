import { Component, OnInit, Input } from '@angular/core';
import { AquariumService } from 'src/app/services/aquarium.service';

import { DeviceSensor } from 'src/app/models/DeviceSensor';
import { faChargingStation, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from 'src/app/services/notification.service';
import { DeviceScheduledJob } from 'src/app/models/DeviceScheduledJob';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { JobStatus } from 'src/app/models/types/JobStatus';
import { DeviceInformation } from 'src/app/models/DeviceInformation';
import { DeviceConnectionStatus } from "src/app/models/types/DeviceConnectionStatus";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { getDeployedDeviceInformation, getDeviceConnectionStatus, getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { Aquarium } from 'src/app/models/Aquarium';

@Component({
  selector: 'device-scheduled-job-card',
  templateUrl: './device-scheduled-job-card.component.html',
  styleUrls: ['./device-scheduled-job-card.component.scss']
})
export class DeviceScheduledJobCardComponent {

  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);
  public deviceInformation$: Observable<DeviceInformation> = this.store.select(getDeployedDeviceInformation);
  public deviceConnectionStatus$: Observable<DeviceConnectionStatus> = this.store.select(getDeviceConnectionStatus);
  DeviceConnectionStatus = DeviceConnectionStatus;
  public deviceInformation: DeviceInformation;

  constructor(public _aquariumService: AquariumService,
    private store: Store<AppState>) { }
}
