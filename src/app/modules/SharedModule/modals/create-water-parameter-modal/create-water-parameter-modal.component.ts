import { Component, OnInit, Inject, ViewChildren, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AquariumService } from 'src/app/services/aquarium.service';

import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { SnapshotDeleteSuccessAction, SnapshotTakeSuccessAction } from 'src/app/store/snapshot/snapshot.actions';
import { NotificationService } from 'src/app/services/notification.service';
import { faCalendarAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Aquarium } from 'src/app/models/Aquarium';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { ElementRef } from '@angular/core';

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
  public focus: string;

  public parameter$: Subject<any> = new Subject();

  @ViewChild('parameterForm', { static: true }) formInputs: ElementRef;


  constructor(@Inject(MAT_DIALOG_DATA) aquarium: Aquarium,
    public _aquariumService: AquariumService,
    private notifier: NotificationService,
    private dialogRef: MatDialogRef<CreateWaterParameterModalComponent>,
    private store: Store<AppState>) {
    this.aquarium = aquarium;
  }

  ngOnInit() {
    if (!this.snapshot) {
      var s = new AquariumSnapshot();
      s.startTime = moment().toDate();
      this.snapshot = s;
    }
    console.log(this.focus, 'focus')
    if (this.focus) {
      var container = this.formInputs.nativeElement;
      var inputs = container.getElementsByTagName("input");

      var input = inputs[this.focus.toLowerCase()];
      if(input)
      {
        setTimeout(() => {
          input.focus();
        },300);
      }
      else
        console.debug("Could not find focus for input",this.focus);
    }
  }
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
    this._aquariumService.createSnapshot(this.aquarium.id, this.snapshot, null).subscribe(
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
}