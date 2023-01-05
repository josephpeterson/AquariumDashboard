import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from 'src/app/services/notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'device-log-card',
  templateUrl: './device-log-card.component.html',
  styleUrls: ['./device-log-card.component.scss']
})
export class DeviceLogCardComponent implements OnInit {

  @Input() device: AquariumDevice;
  @ViewChild("scrollWindow") private scrollContainer: ElementRef;

  deviceLog: any;

  clearingLog: boolean;
  
  constructor(public _aquariumService: AquariumService,
    public notifier: ToastrService) { }

  ngOnInit() {
    this.clickGetDeviceLog();
  }

  clickGetDeviceLog() {
    console.warn("Getting device log...");
    delete this.deviceLog;
    this._aquariumService.getDeviceLog(this.device.id).subscribe(data => {
      this.deviceLog = data;
    }, err => {
      console.log(err);
      this.notifier.error("Could not retrieve debug log from aquarium device");
    });
  }
  clickClearLog() {
    this.clearingLog = true;
    this._aquariumService.clearDeviceLog(this.device.id).subscribe(data => {
      this.clearingLog = false;
      delete this.deviceLog;
      this.notifier.success("Device log cleared");
    }, err => {
      console.log(err);
      this.clearingLog = false;
    });
  }
}
