import { Component, OnInit, Input } from '@angular/core';
import { AquariumService } from 'src/app/services/aquarium.service';

import { DeviceSensor } from 'src/app/models/DeviceSensor';
import { faChargingStation, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'device-sensor-card',
  templateUrl: './device-sensor-card.component.html',
  styleUrls: ['./device-sensor-card.component.scss']
})
export class DeviceSensorCardComponent implements OnInit {

  @Input("sensor") sensor: DeviceSensor;

  public faChargingStation = faChargingStation;

  constructor(public _aquariumService: AquariumService, public notifier: NotificationService) { }

  ngOnInit() {
  }

  clickGetDeviceLog() {

  }

}
