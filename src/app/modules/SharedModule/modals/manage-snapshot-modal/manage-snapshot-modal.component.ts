import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { ConnectionError } from 'src/app/models/ConnectionError';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';

import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { SnapshotDeleteSuccessAction, SnapshotTakeSuccessAction } from 'src/app/store/snapshot/snapshot.actions';
import { SnapshotDetailComponent } from '../../data/snapshot/snapshot-detail-form/snapshot-detail-form.component';
import { SnapshotDetailChartComponent } from '../../data/snapshot/snapshot-detail-chart/snapshot-detail-chart.component';
import { AttachmentUploaderComponent } from '../../attachment-uploader/attachment-uploader.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'manage-snapshot-modal',
  templateUrl: './manage-snapshot-modal.component.html',
  styleUrls: ['./manage-snapshot-modal.component.scss']
})
export class ManageSnapshotModal implements OnInit {

  public updating: boolean = false;
  public snapshot: AquariumSnapshot;
  public chartView: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) snapshot,
    public _aquariumService: AquariumService,
    private notifier: NotificationService,
    private dialogRef: MatDialogRef<ManageSnapshotModal>,
    private store: Store<AppState>) {
    this.snapshot = snapshot;
  }

  ngOnInit() {
    console.log(this.snapshot);
  }

  @ViewChild(SnapshotDetailComponent) snapshotForm: SnapshotDetailComponent;
  @ViewChild(SnapshotDetailChartComponent) snapshotChartForm: SnapshotDetailChartComponent;
  @ViewChild(AttachmentUploaderComponent) attachmentUploader: AttachmentUploaderComponent;


  clickUpdateSnapshot() {
    this._aquariumService.updateSnapshot(this.snapshot).subscribe(
      (snapshot: AquariumSnapshot) => {
        this.snapshot = snapshot;
        this.dialogRef.close(this.snapshot);
      },
      (err) => this.handleErr
    );
  }
  clickCreateSnapshot() {
    var attachment = this.attachmentUploader.getAttachment();
    this.snapshot = (this.chartView ? this.snapshotChartForm:this.snapshotForm).snapshot;
    this.updating = true;

    this._aquariumService.createSnapshot(this.snapshot, attachment).subscribe(
      (snapshot: AquariumSnapshot) => {
        this.snapshot = snapshot;
        this.dialogRef.close(this.snapshot);
        this.store.dispatch(new SnapshotTakeSuccessAction(snapshot));
      },
      (err) => this.handleErr
    );
  }
  handleErr(err) {
    this.notifier.notify("error", "Could not apply parameter settings");
    this.updating = false;
  }
  clickDeleteSnapshot() {
    this._aquariumService.deleteSnapshot(this.snapshot).subscribe(
      (snapshot: AquariumSnapshot) => {
        this.store.dispatch(new SnapshotDeleteSuccessAction(this.snapshot));
        this.dialogRef.close(this.snapshot);
      },
      (err) => this.handleErr
    );
  }
  clickSwitchView() {
    this.chartView = !this.chartView;
  }
}