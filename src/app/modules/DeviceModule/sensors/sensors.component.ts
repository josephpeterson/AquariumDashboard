import { Component, OnInit, Input } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';

import { faCheckCircle, faEdit, faSync, faTrash, faVial, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { CreateDeviceSensorModalComponent } from '../../SharedModule/modals/create-device-sensor-modal/create-device-sensor-modal.component';
import { take } from 'rxjs/operators';
import { DeviceSensor } from 'src/app/models/DeviceSensor';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { TestDeviceSensorModalComponent } from '../../SharedModule/modals/test-device-sensor-modal/test-device-sensor-modal.component';
import { ConfirmModalComponent } from '../../SharedModule/modals/confirm-modal/confirm-modal.component';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'device-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class DeviceSensorsComponent implements OnInit {

  @Input("device") public device: AquariumDevice;

  public loading: boolean = false;
  public error: string;
  public sensors: DeviceSensor[];
  public disabledIds: number[] = [];
  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);



  public faRefresh: IconDefinition = faSync;
  public faTrash: IconDefinition = faTrash;
  public faEdit: IconDefinition = faEdit;
  public faVial: IconDefinition = faVial;
  faCheck = faCheckCircle;


  public readableTypes = new Subject();



  constructor(public _aquariumService: AquariumService,
    public notifier: NotificationService,
    public store: Store<AppState>,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.aquarium$.pipe().subscribe(aq => {
      this.device = aq.device;
    });
    this.loadReadableTypes();
  }

  private loadReadableTypes() {
    this._aquariumService.getSelectOptionsByType("DeviceSensorTypes").subscribe((data: any[]) => {
      this.readableTypes.next(data);
    });
  }

  clickAddSensor() {
    var dialog = this.dialog.open(CreateDeviceSensorModalComponent, {
      width: "40%",
    });
    dialog.componentInstance.device = this.device;
    dialog.afterClosed().pipe(take(1)).subscribe((sensor) => {
      //this.data.load(); //Shouldn't have to do this if we just add to the store
      //this.loadDeviceSensors();
      if (sensor)
        this.sensors.push(sensor);
    });
    //dialog.error = new ConnectionError(error);
  }
  clickRemoveSensor(deviceSensor: DeviceSensor) {


    var dialog = this.dialog.open(ConfirmModalComponent, {
    });
    dialog.componentInstance.title = "Delete Sensor";
    dialog.componentInstance.body = "Are you sure you want to remove this sensor? This will remove this sensor from any schedules and tasks that require this sensor. This action cannot be undone.";
    dialog.afterClosed().pipe(take(1)).subscribe((confirm: boolean) => {
      if (confirm) {
        if (this.disabledIds.indexOf(deviceSensor.id) != -1)
          return;

        this.disabledIds.push(deviceSensor.id);
        delete this.error;
        this._aquariumService.removeDeviceSensor(this.device.id, deviceSensor).subscribe(res => {
          this.disabledIds.splice(this.disabledIds.indexOf(deviceSensor.id), 1);
          this.sensors.splice(this.sensors.indexOf(deviceSensor), 1);
        }, (err: HttpErrorResponse) => {
          this.error = err.message;
          this.disabledIds.splice(this.disabledIds.indexOf(deviceSensor.id), 1);
        });
      }
    });
  }
  clickEditSensor(deviceSensor: DeviceSensor) {
    if (this.disabledIds.indexOf(deviceSensor.id) != -1)
      return;
    this.disabledIds.push(deviceSensor.id);
    delete this.error;

    var dialog = this.dialog.open(CreateDeviceSensorModalComponent, {
      width: "40%",
    });
    dialog.componentInstance.device = this.device;
    dialog.componentInstance.newDeviceSensor = { ...deviceSensor };
    dialog.afterClosed().pipe(take(1)).subscribe((sensor) => {
      this.disabledIds.splice(this.disabledIds.indexOf(deviceSensor.id), 1);
      if (sensor) {
        this.sensors.splice(this.sensors.indexOf(deviceSensor), 1, sensor);
      }
    });
  }
  clickTestSensor(deviceSensor: DeviceSensor) {
    if (this.disabledIds.indexOf(deviceSensor.id) != -1)
      return;
    this.disabledIds.push(deviceSensor.id);
    delete this.error;

    var dialog = this.dialog.open(TestDeviceSensorModalComponent, {
    });
    dialog.componentInstance.sensor = deviceSensor;
    dialog.componentInstance.device = this.device;
    dialog.afterClosed().pipe(take(1)).subscribe((sensor) => {
      this.disabledIds.splice(this.disabledIds.indexOf(deviceSensor.id), 1);
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
  loadDeviceSensors() {
    this.loading = true;
    delete this.error;
    this._aquariumService.getDeviceSensors(this.device.id).subscribe((res: DeviceSensor[]) => {
      this.loading = false;
      this.sensors = res;
      console.log(res);
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.error = err.message;
    });
  }
}
