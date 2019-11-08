import { Component, OnInit, Input, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { AquariumService } from 'src/app/services/aquarium.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { PhotoContent } from 'src/app/models/PhotoContent';
import { PhotoApplyModalComponent } from '../photo-apply-modal/photo-apply-modal.component';

@Component({
  selector: 'photo-expanded-modal',
  templateUrl: './photo-expanded-modal.component.html',
  styleUrls: ['./photo-expanded-modal.component.scss']
})
export class PhotoExpandedModalComponent implements OnInit {

  public componentLifecycle = new Subject();

  constructor(@Inject(MAT_DIALOG_DATA) public photo: PhotoContent,
    private _aquariumService: AquariumService,
    private _dialog: MatDialogRef<PhotoExpandedModalComponent>,
    private dialog: MatDialog,
    private _notifier: NotifierService) {
  }
  ngOnInit() {
  }

  public getPhotoPermalink() {
    return this._aquariumService.getPhotoPermalink(this.photo.id, "raw");
  }

  public clickDelete() {
    this._aquariumService.deletePhoto(this.photo).subscribe(() => {
      this._notifier.notify("success", "Photo was successfully removed");
      this._dialog.close();
    }, err => {
      this._notifier.notify("error", "Error removing photo");
      console.error(err);
    });
  }
  public clickApplyPhoto() {
    this.dialog.open(PhotoApplyModalComponent,{
      data: this.photo
    });
  }
}