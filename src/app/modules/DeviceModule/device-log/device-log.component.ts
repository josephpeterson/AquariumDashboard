import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'device-log',
  templateUrl: './device-log.component.html',
  styleUrls: ['./device-log.component.scss']
})
export class DeviceLogComponent implements OnInit {

  @Input("device") device: AquariumDevice;
  @ViewChild("scrollWindow",{static: false}) private scrollContainer: ElementRef;

  deviceLog: any;

  clearingLog: boolean;
  
  constructor(public _aquariumService: AquariumService, public notifier: NotificationService) { }

  ngOnInit() {
  }

  clickGetDeviceLog() {
    if(!this.device)
      return;
    delete this.deviceLog;
    this._aquariumService.getDeviceLog(this.device.id).subscribe(data => {
      this.deviceLog = data;
    }, err => {
      console.log(err);
    });
  }
  clickClearLog() {
    this.clearingLog = true;
    this._aquariumService.clearDeviceLog(this.device.id).subscribe(data => {
      this.clearingLog = false;
      delete this.deviceLog;
      this.notifier.notify("success","Device log cleared");
    }, err => {
      console.log(err);
      this.clearingLog = false;
    });
  }
}
