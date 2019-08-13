import { Component, OnInit } from '@angular/core';
import { BugReport } from 'src/app/models/BugReport';
import { Fish } from 'src/app/models/Fish';
import { AquariumService } from 'src/app/services/aquarium.service';
import { FishPhoto } from 'src/app/models/FishPhoto';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'fish-photo-select-modal',
  templateUrl: './fish-photo-select-modal.component.html',
  styleUrls: ['./fish-photo-select-modal.component.scss']
})
export class FishPhotoSelectModal implements OnInit {

  public fish: Fish;
  constructor(private _aquariumService: AquariumService,
    private _dialog: MatDialogRef<FishPhotoSelectModal>) { }

  ngOnInit() {

  }

  public selectPhoto(photo: FishPhoto) {
    this._dialog.close(photo);
  }
  public getFishPhotoSource(photoId) {
    return this._aquariumService.getFishPhotoPermalink(photoId);
  }
}