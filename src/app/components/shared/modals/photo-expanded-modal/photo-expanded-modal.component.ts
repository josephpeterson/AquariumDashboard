import { Component, OnInit, Input } from '@angular/core';
import { AquariumPhoto } from 'src/app/models/AquariumPhoto';
import { Subject } from 'rxjs';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { environment } from 'src/environments/environment';
import { AquariumService } from 'src/app/services/aquarium.service';
import { FishPhoto } from 'src/app/models/FishPhoto';
import { MatDialogRef } from '@angular/material';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'photo-expanded-modal',
  templateUrl: './photo-expanded-modal.component.html',
  styleUrls: ['./photo-expanded-modal.component.scss']
})
export class PhotoExpandedModalComponent implements OnInit {

  @Input() aquariumPhoto: AquariumPhoto;
  @Input() fishPhoto: FishPhoto;
  @Input() photoId: number;
  public imageSrc: string;
  public componentLifecycle = new Subject();

  constructor(private _aquariumService: AquariumService,
    private _dialog: MatDialogRef<PhotoExpandedModalComponent>,
    private _notifier: NotifierService) {
  }
  ngOnInit() {
    if (this.aquariumPhoto) {
      this.imageSrc = this._aquariumService.getPhotoPermalink(this.aquariumPhoto.id, "raw");
    }
    else if (this.fishPhoto)
      this.imageSrc = this._aquariumService.getFishPhotoPermalink(this.fishPhoto.id, "raw");
  }

  public clickDelete() {
    this._dialog.close();
    if (this.fishPhoto) {
      this._aquariumService.deleteFishPhoto(this.fishPhoto).subscribe(val => {
        this._notifier.notify("success", "Fish photo was removed");
      }, err => {
        this._notifier.notify("error", "Error removing photo");
        console.error(err);
      });
    }
  }
}