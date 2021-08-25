import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { ConnectionError } from 'src/app/models/ConnectionError';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';

import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { SnapshotDeleteSuccessAction, SnapshotTakeSuccessAction } from 'src/app/store/snapshot/snapshot.actions';
import { SnapshotDetailChartComponent } from '../../data/snapshot/snapshot-detail-chart/snapshot-detail-chart.component';
import { AttachmentUploaderComponent } from '../../attachment-uploader/attachment-uploader.component';
import { NotificationService } from 'src/app/services/notification.service';
import { faCalendarAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Aquarium } from 'src/app/models/Aquarium';
import * as moment from 'moment';

@Component({
  selector: 'create-water-parameter-modal',
  templateUrl: './create-water-parameter-modal.component.html',
  styleUrls: ['./create-water-parameter-modal.component.scss']
})
/* todo Obsolete */
export class CreateWaterParameterModalComponent implements OnInit {

  public updating: boolean = false;
  public snapshot: AquariumSnapshot;
  public aquarium: Aquarium;
  public chartView: boolean = true;
  public faInfoCircle = faInfoCircle;
  public faArrowDown = faCalendarAlt;

  constructor(@Inject(MAT_DIALOG_DATA) aquarium: Aquarium,
    public _aquariumService: AquariumService,
    private notifier: NotificationService,
    private dialogRef: MatDialogRef<CreateWaterParameterModalComponent>,
    private store: Store<AppState>) {
    this.aquarium = aquarium;
  }

  ngOnInit() {
    console.log(this.snapshot);

    if(!this.snapshot)
    {
      var s = new AquariumSnapshot();
      s.startTime = moment().toDate();
      this.snapshot = s;
    }

  }

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
    this.updating = true;
    this._aquariumService.createSnapshot(this.aquarium.id,this.snapshot, null).subscribe(
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
  clickSwitchView(val: number) {
    if (val == 0)
      this.chartView = true;
    else
      this.chartView = false;
  }
}