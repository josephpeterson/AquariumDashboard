import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { ConnectionError } from 'src/app/models/ConnectionError';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { NotificationService } from 'src/app/services/notification.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'manage-photo-configuration',
  templateUrl: './manage-photo-configuration.component.html',
  styleUrls: ['./manage-photo-configuration.component.scss']
})
export class ManagePhotoConfigurationModal implements OnInit {

  public updating: boolean = false;
  public device: AquariumDevice;

  constructor(@Inject(MAT_DIALOG_DATA) data, private _aquariumService: AquariumService, private notifier: ToastrService, private dialogRef: MatDialogRef<ManagePhotoConfigurationModal>) {
    this.device = {...data};
  }

  ngOnInit() {
  }

  clickUpdateConfiguration() {
    this.updating = true;
    this._aquariumService.updateAquariumDevice(this.device).subscribe(
      (device: AquariumDevice) => {
        this.device = device;
        //this.updating = false;
        this.dialogRef.close(this.device);
      },
      (err) => {
        this.notifier.error( "Could not update camera settings");
        this.updating = false;
      }
    );
  }
}