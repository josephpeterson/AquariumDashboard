import { Component, OnInit, Input } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';

import { faCheckCircle, faEdit, faPlus, faSync, faTrash, faVial, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { CreateDeviceSensorModalComponent } from '../../SharedModule/modals/create-device-sensor-modal/create-device-sensor-modal.component';
import { take } from 'rxjs/operators';
import { DeviceSensor } from 'src/app/models/DeviceSensor';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { TestDeviceSensorModalComponent } from '../../SharedModule/modals/test-device-sensor-modal/test-device-sensor-modal.component';
import { ConfirmModalComponent } from '../../SharedModule/modals/confirm-modal/confirm-modal.component';
import { getDeployedDeviceInformation, getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { AquariumLoadByIdAction, AquariumSelectionAction } from 'src/app/store/aquarium/aquarium.actions';
import { DeviceInformation } from 'src/app/models/DeviceInformation';

@Component({
  selector: 'device-sensors',
  templateUrl: './sensors.component.html',
  //styleUrls: ['./sensors.component.scss']
})
export class DeviceSensorsComponent implements OnInit {
  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);
  public deviceInformation$: Observable<DeviceInformation> = this.store.select(getDeployedDeviceInformation);
  public faRefresh: IconDefinition = faSync;
  public faPlus = faPlus;
  public readableTypes = new Subject();

  constructor(public _aquariumService: AquariumService,
    public notifier: NotificationService,
    public store: Store<AppState>,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadReadableTypes();
  }
  private loadReadableTypes() {
    this._aquariumService.getSelectOptionsByType("DeviceSensorTypes").subscribe((data: any[]) => {
      this.readableTypes.next(data);
    });
  }

  clickAddSensor(device: AquariumDevice) {
    var dialog = this.dialog.open(CreateDeviceSensorModalComponent, {
      width: "40%",
    });
    dialog.componentInstance.device = device;
    dialog.afterClosed().pipe(take(1)).subscribe((sensor) => {
      if (sensor)
        this.store.dispatch(new AquariumSelectionAction(device.aquariumId));
    });
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
