import { Component, OnInit, Input } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';

import { faCarBattery, faCheckCircle, faEdit, faSync, faTrash, faVial, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { CreateDeviceSensorModalComponent } from '../../../SharedModule/modals/create-device-sensor-modal/create-device-sensor-modal.component';
import { take } from 'rxjs/operators';
import { DeviceSensor } from 'src/app/models/DeviceSensor';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { TestDeviceSensorModalComponent } from '../../../SharedModule/modals/test-device-sensor-modal/test-device-sensor-modal.component';
import { ConfirmModalComponent } from '../../../SharedModule/modals/confirm-modal/confirm-modal.component';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { AquariumLoadByIdAction, AquariumSelectionAction } from 'src/app/store/aquarium/aquarium.actions';

@Component({
  selector: 'sensor-mini-card',
  templateUrl: './sensor-mini-card.component.html',
  styleUrls: ['./sensor-mini-card.component.scss']
})
export class DeviceSensorMiniCardComponent implements OnInit {

  @Input("sensor") public sensor: DeviceSensor;
  @Input("device") public device: AquariumDevice;
  @Input("types") public types: [];

  public loading: boolean = false;
  public error: string;
  public sensors: DeviceSensor[];
  public disabled: boolean = false;
  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);



  public faRefresh: IconDefinition = faSync;
  public faTrash: IconDefinition = faTrash;
  public faEdit: IconDefinition = faEdit;
  public faVial: IconDefinition = faVial;
  public faCarBattery: IconDefinition = faCarBattery;
  faCheck = faCheckCircle;


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
  clickEditSensor() {
    if (this.disabled) return;
    this.disabled = true;
    delete this.error;

    var dialog = this.dialog.open(CreateDeviceSensorModalComponent, {
      width: "40%",
    });
    dialog.componentInstance.device = this.device;
    dialog.componentInstance.newDeviceSensor = { ...this.sensor };
    dialog.afterClosed().pipe(take(1)).subscribe((sensor) => {
      this.disabled = false;
      if (sensor) {
        this.store.dispatch(new AquariumSelectionAction(this.device.aquariumId));
      }
      else if (sensor == null) //deleted
        this.store.dispatch(new AquariumSelectionAction(this.device.aquariumId));
    });
  }
  clickTestSensor() {
    if (this.disabled) return;
    this.disabled = true;
    delete this.error;

    var dialog = this.dialog.open(TestDeviceSensorModalComponent, {
    });
    dialog.componentInstance.sensor = this.sensor;
    dialog.componentInstance.device = this.device;
    dialog.afterClosed().pipe(take(1)).subscribe((sensor) => {
      this.disabled = false;
    });
  }
  getSensorReadableType(types, type: number) {
    for (var i = 0; i < types.length; i++) {
      var t = types[i];
      if (t.value == type)
        return t.key;
    }
    return "Unknown";
  }

}
