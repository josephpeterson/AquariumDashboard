import { Component, OnInit, ViewChild } from '@angular/core';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AttachmentUploaderComponent } from '../../attachment-uploader/attachment-uploader.component';

import { MatDialogRef } from '@angular/material/dialog';
import { FishFeedModalComponent } from '../fish-feed-modal/fish-feed-modal.component';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { FishLoadByIdAction } from 'src/app/store/fish/fish.actions';
import { NotificationService } from 'src/app/services/notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'fish-photo-modal',
  templateUrl: './fish-photo-modal.component.html',
  styleUrls: ['./fish-photo-modal.component.scss']
})
export class FishPhotoModal implements OnInit {
  public loading: boolean;
  public fishId: number;
  @ViewChild(AttachmentUploaderComponent) attachmentComponent: AttachmentUploaderComponent;
  constructor(private _aquariumService: AquariumService,
    private store: Store<AppState>,
    private notifier: ToastrService,
    private _dialog: MatDialogRef<FishPhotoModal>) { }
  ngOnInit() {
  }

  public clickSubmit() {
    var attachment = this.attachmentComponent.getAttachment();
    if (!attachment)
      return false;
    this.loading = true;
    this._aquariumService.uploadFishPhoto(this.fishId, attachment).subscribe(val => {
      this.loading = false;
      this._dialog.close(val);
      this.store.dispatch(new FishLoadByIdAction(this.fishId));
    }, (err) => {
      this.loading = false;
      this.notifier.error( "Could not upload fish photo.");
    });
  }
}