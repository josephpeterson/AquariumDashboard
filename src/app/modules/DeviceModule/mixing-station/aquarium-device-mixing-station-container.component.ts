import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AquariumMixingStationStatus } from '../../SharedDeviceModule/models/AquariumMixingStationStatus';
import { DeviceConnectionStatus } from '../../SharedDeviceModule/models/RaspberyPiModels';
import { connectToMixingStation } from '../../SharedDeviceModule/store/device.actions';
import { selectConfiguredDevice, selectMixingStationConnection, selectMixingStationStatus } from '../../SharedDeviceModule/store/device.selectors';

@Component({
  selector: 'aquarium-device-mixing-station-container',
  templateUrl: './aquarium-device-mixing-station-container.component.html',
  //styleUrls: ['./sensors.component.scss']
})
export class AquariumDeviceMixingStationContainerComponent {
  public configuredDevice$ = this.store.select(selectConfiguredDevice);
  public mixingStation$ = this.store.select(selectMixingStationConnection);
  public mixingStationConnectionStatus$ = this.store.select(selectMixingStationStatus);
  constructor(private store: Store) {
  }
  ngOnInit(): void {
    this.store.dispatch(connectToMixingStation());
  }

  public hasNoMixingStation(status: DeviceConnectionStatus, mixingStation: AquariumMixingStationStatus) {
    return status == DeviceConnectionStatus.Failed
  }
  public DeviceConnectionStatus = DeviceConnectionStatus;
}
