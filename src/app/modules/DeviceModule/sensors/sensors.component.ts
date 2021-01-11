import { Component, OnInit, Input } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { NotifierService } from 'angular-notifier';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';
import { ManagePhotoConfigurationModal } from 'src/app/modules/SharedModule/modals/manage-photo-configuration/manage-photo-configuration.component';

@Component({
  selector: 'device-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class DeviceSensorsComponent implements OnInit {

  @Input("aquarium") public aquarium: Aquarium;
  scanning: boolean;

  faCheck = faCheckCircle;
  pinging: boolean;


  constructor(public _aquariumService: AquariumService,
    public notifier: NotifierService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  clickScanDeviceHardware() {
    this.scanning = true;
    this._aquariumService.scanDeviceHardware(this.aquarium.device.id).subscribe(
      (device: AquariumDevice) => {
        console.log(device);
        this.aquarium.device = device;
        this.scanning = false;
      }, err => {
        this.scanning = false;
        this.notifier.notify("error", "Check Device Hardware Failed");
      })
  }
  clickPingDevice() {
    this.pinging = true;
    this._aquariumService.pingDevice(this.aquarium.device.id).subscribe(
      () => {
        this.pinging = false;
        this.notifier.notify("success", "Connection to device was successfull");
      }, err => {
        this.pinging = false;
        this.notifier.notify("error", "Could not connect to device");
      })
  }
  clickManagePhotoModule() {
    this.dialog.open(ManagePhotoConfigurationModal, {
      width: "50%",
      data: this.aquarium.device
    }).afterClosed().subscribe((device: AquariumDevice) => {
      if (device)
      {
        this.aquarium.device.cameraConfiguration = device.cameraConfiguration;
      }
    });
  }
}
