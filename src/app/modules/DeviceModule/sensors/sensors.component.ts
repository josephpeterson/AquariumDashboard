import { Component, OnInit } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';

import { faPlus, faSync, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { Store } from '@ngrx/store';
import { AquariumSelectionAction } from 'src/app/store/aquarium/aquarium.actions';
import { AquariumDeviceService } from '../../SharedDeviceModule/aquarium-device.service';
import { DeviceInformation } from '../../SharedDeviceModule/models/DeviceInformation';
import { DeviceSensorUpsertModalComponent } from '../../SharedDeviceModule/components/modals/device-sensor-upsert-modal/device-sensor-upsert-modal.component';
import { selectDeviceInformation } from '../../SharedDeviceModule/store/device.selectors';

@Component({
  selector: 'device-sensors',
  templateUrl: './sensors.component.html',
  //styleUrls: ['./sensors.component.scss']
})
export class DeviceSensorsComponent implements OnInit {
  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);
  public deviceInformation$: Observable<DeviceInformation> = this.store.select(selectDeviceInformation);
  public faRefresh: IconDefinition = faSync;
  public faPlus = faPlus;
  public readableTypes = new Subject();

  constructor(public _aquariumService: AquariumService,
    public _aquariumDeviceService: AquariumDeviceService,
    public notifier: NotificationService,
    public store: Store,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadReadableTypes();

    this.deviceInformation$.subscribe(x => {
      console.log("sensors component", x);
    })
  }
  private loadReadableTypes() {
    this._aquariumDeviceService.getSelectOptionsByType("DeviceSensorTypes").subscribe((data: any[]) => {
      this.readableTypes.next(data);
    });
  }

  clickAddSensor(device: AquariumDevice) {
    this.deviceInformation$.subscribe(deviceInformation => {
      var dialog = this.dialog.open(DeviceSensorUpsertModalComponent, {
        width: "40%",
        data: {
          configuredDevice: deviceInformation.configuredDevice
        }
      });
      dialog.afterClosed().pipe(take(1)).subscribe((sensor) => {
        if (sensor)
          this.store.dispatch(new AquariumSelectionAction(device.aquariumId));
      });
    })


  }
  //todo- eventually have a store manage a database of types
  getSensorReadableType(types, type: number) {
    for (var i = 0; i < types.length; i++) {
      var t = types[i];
      if (t.value == type)
        return t.key;
    }
    return "Unknown";
  }
}
