import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { CreateScheduleModalComponent } from '../create-schedule-modal/create-schedule-modal.component';
import { PhotoExpandedModalComponent } from '../photo-expanded-modal/photo-expanded-modal.component';
import { HttpErrorResponse } from '@angular/common/http';

import { PhotoContent } from 'src/app/models/PhotoContent';
import { PhotoTimelapseOptions } from 'src/app/models/PhotoTimelapseOptions';
import { AquariumService } from 'src/app/services/aquarium.service';

@Component({
  selector: 'app-create-timelapse-modal',
  templateUrl: './create-timelapse-modal.component.html',
  styleUrls: ['./create-timelapse-modal.component.scss']
})
export class CreateTimelapseModalComponent implements OnInit {

  public disabled: boolean = false;
  public timelapsePhotos: PhotoContent[]
  public timelapseOptions: PhotoTimelapseOptions = new PhotoTimelapseOptions();

  public previewId: number = 0;
  private _tick;

  constructor(@Inject(MAT_DIALOG_DATA) photos,
    private _dialogRef: MatDialogRef<CreateTimelapseModalComponent>,
    private aquariumService: AquariumService,
    private notifier: NotificationService,
    private dialog: MatDialog
  ) {
    this.timelapsePhotos = photos;
  }

  ngOnInit() {
    this.startAnimatedPreview();

  }

  public startAnimatedPreview() {
    clearTimeout(this._tick);

    var callback = () => {
      this.previewId++;
      if (this.previewId >= this.timelapsePhotos.length)
        this.previewId = 0;
      this._tick = setTimeout(callback, 1000 / this.timelapseOptions.framerate);
    }
    callback();
  }
  public stopAnimatedPreview() {
    clearTimeout(this._tick);
  }
  public getCurrentPreview() {
    return this.timelapsePhotos[this.previewId];
  }
  public clickSubmit() {
    var ids = this.timelapsePhotos.map(pc => pc.id);

    this.notifier.notify("warning", `Generating timelapse from ${ids.length} images...`);
    this._dialogRef.close();
    this.aquariumService.createPhotoTimelapse(ids, this.timelapseOptions).subscribe((data: PhotoContent) => {
      var dialog = this.dialog.open(PhotoExpandedModalComponent, {
        panelClass: "expanded-photo-dialog",
        data: data
      });
    }, (err: HttpErrorResponse) => {
      this.notifier.notify("error", `Could not generate timelapse. Unknown error occured`);
      console.error(err);
    })
  }

  getPhotoPermalink(photo) {
    return this.aquariumService.getPhotoPermalink(photo, "0.25");
  }
}
