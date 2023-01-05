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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'create-water-change-modal',
  templateUrl: './create-water-change-modal.component.html',
  styleUrls: ['./create-water-change-modal.component.scss']
})
/* todo Obsolete */
export class CreateWaterChangeModalComponent implements OnInit {

  @Input() public waterChange: WaterChange;
  public aquarium: Aquarium;
  public faInfoCircle = faInfoCircle;
  public disabled: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) aquarium: Aquarium,
    public _aquariumService: AquariumService,
    private notifier: ToastrService,
    private dialogRef: MatDialogRef<CreateWaterChangeModalComponent>,
    private store: Store<AppState>) {
    this.aquarium = aquarium;
  }

  ngOnInit() {
    if(!this.waterChange)
    {
      var s = new WaterChange();
      s.startTime = moment().toDate().toTimeString();
      this.waterChange = s;
    }

  }

  public clickSubmit() {
    this.disabled = true;
    this._aquariumService.addWaterChange(this.aquarium.id,this.waterChange).subscribe(data => {
      this.disabled = false;
      this.waterChange = new WaterChange();
      this.notifier.success("Water change successfully added (" + data.id + ")");
      this.dialogRef.close(data);
    },
    err => {
      this.disabled = false;
      console.error(err);
    });
  }
  public getAquariumVisual() {
    var options = new VisualAquariumComponentOptions();
    options.waterAdded = this.waterChange.gallonsAdded;
    options.waterRemoved = this.waterChange.gallonsRemoved;
    options.waterLevel = this.aquarium.gallons/2;
    return options;
  }
}