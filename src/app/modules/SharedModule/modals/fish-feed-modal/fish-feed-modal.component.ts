import { Component, OnInit, Inject } from '@angular/core';
import { BugReport } from 'src/app/models/BugReport';
import { Fish } from 'src/app/models/Fish';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AquariumService } from 'src/app/services/aquarium.service';

import { ManagePhotoConfigurationModal } from '../manage-photo-configuration/manage-photo-configuration.component';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { NotificationService } from 'src/app/services/notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'fish-feed-modal',
  templateUrl: './fish-feed-modal.component.html',
  styleUrls: ['./fish-feed-modal.component.scss']
})
export class FishFeedModalComponent implements OnInit {

  public updating: boolean = false;
  public fish: Fish;

  constructor(@Inject(MAT_DIALOG_DATA) fish:Fish,
   private _aquariumService: AquariumService,
    private notifier: ToastrService,
     private dialogRef: MatDialogRef<ManagePhotoConfigurationModal>) {
    this.fish = fish;
  }

  ngOnInit() {
  }

  clickUpdateConfiguration() {
    this.updating = true;
    /*
    this._aquariumService(this.device).subscribe(
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
    */
  }
}
