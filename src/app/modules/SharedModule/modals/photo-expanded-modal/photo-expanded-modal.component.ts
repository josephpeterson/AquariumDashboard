import { Component, OnInit, Input, Inject, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { PhotoApplyModalComponent } from '../photo-apply-modal/photo-apply-modal.component';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { PhotoContent } from 'src/app/models/PhotoContent';
import { AquariumService } from 'src/app/services/aquarium.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'photo-expanded-modal',
  templateUrl: './photo-expanded-modal.component.html',
  styleUrls: ['./photo-expanded-modal.component.scss']
})
export class PhotoExpandedModalComponent implements OnInit {

  public componentLifecycle = new Subject();
  public faTrash = faTrash;
  @ViewChild("photo") photoElement: ElementRef<HTMLImageElement>;



  constructor(@Inject(MAT_DIALOG_DATA) public photo: PhotoContent,
    private _aquariumService: AquariumService,
    private _dialog: MatDialogRef<PhotoExpandedModalComponent>,
    private dialog: MatDialog,
    private _notifier: ToastrService) {
  }
  ngOnInit() {
  }

  public getPhotoPermalink() {
    return this._aquariumService.getPhotoPermalink(this.photo, "1");
  }
  public clickDelete() {
    this._aquariumService.deletePhoto(this.photo).subscribe(() => {
      this._notifier.success( "Photo was successfully removed");
      this._dialog.close();
    }, err => {
      this._notifier.error( "Error removing photo");
      console.error(err);
    });
  }
  public clickApplyPhoto() {
    this.dialog.open(PhotoApplyModalComponent, {
      data: this.photo
    });
  }
  public imageReady(evt) {
    var img = evt.target
    var w = img.width + "px";
    var h = img.height + "px";
    this._dialog.updateSize(w, h);
    console.log(w, h);
  }

  public getPhotoType() {

    var ext = this.photo.filepath.split('.').pop();

    switch (ext) {
      case "avi":
      case "mp4":
        return "video";
      default:
        return "img";
    }
  }
}