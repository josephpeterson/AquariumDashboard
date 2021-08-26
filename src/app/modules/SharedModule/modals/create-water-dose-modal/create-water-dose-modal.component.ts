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
import { WaterChange } from 'src/app/models/WaterChange';
import { VisualAquariumComponentOptions } from '../../visual-aquarium/visual-aquarium.component';
import { WaterDosing } from 'src/app/models/WaterDosing';

@Component({
  selector: 'create-water-dose-modal',
  templateUrl: './create-water-dose-modal.component.html',
  styleUrls: ['./create-water-dose-modal.component.scss']
})
/* todo Obsolete */
export class CreateWaterDoseModalComponent implements OnInit {

  @Input() public waterDose: WaterDosing;
  public aquarium: Aquarium;
  public faInfoCircle = faInfoCircle;
  public disabled: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) aquarium: Aquarium,
    public _aquariumService: AquariumService,
    private notifier: NotificationService,
    private dialogRef: MatDialogRef<CreateWaterDoseModalComponent>,
    private store: Store<AppState>) {
    this.aquarium = aquarium;
  }

  ngOnInit() {
    if(!this.waterDose)
    {
      var s = new WaterDosing();
      s.date = moment().toDate();
      this.waterDose = s;
    }

  }

  public clickSubmit() {
    this.disabled = true;
    this._aquariumService.addWaterDosing(this.aquarium.id,this.waterDose).subscribe(data => {
      this.disabled = false;
      this.waterDose = new WaterDosing();
      this.notifier.notify("success","Water dosing successfully added (" + data.id + ")");
      this.dialogRef.close(data);
    },
    err => {
      this.disabled = false;
      console.error(err);
    });
  }
}