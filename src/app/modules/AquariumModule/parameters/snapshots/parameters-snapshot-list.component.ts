import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AquariumService } from 'src/app/services/aquarium.service';
import { Aquarium } from 'src/app/models/Aquarium';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { take } from 'rxjs/operators';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { ConfirmModalComponent } from 'src/app/modules/SharedModule/modals/confirm-modal/confirm-modal.component';
import { AquariumLoadSuccessAction } from 'src/app/store/aquarium/aquarium.actions';
import { NotificationService } from 'src/app/services/notification.service';
import { CreateWaterParameterModalComponent } from 'src/app/modules/SharedModule/modals/create-water-parameter-modal/create-water-parameter-modal.component';


@Component({
  selector: 'parameters-snapshot-list',
  templateUrl: './parameters-snapshot-list.component.html',
  styleUrls: ['./parameters-snapshot-list.component.scss']
})
export class ParametersSnapshotListComponent implements OnInit {

  public aquarium: Aquarium;
  deletingAllSnapshots: boolean;

  constructor(public aquariumService: AquariumService,
    public dialog: MatDialog,
    public store: Store<AppState>,
    public notifier: NotificationService
  ) { }

  ngOnInit() {
    this.store.select(getSelectedAquarium).pipe(take(1)).subscribe(aq => this.aquarium = aq);
  }

  clickAddSnapshot() {
    this.dialog.open(CreateWaterParameterModalComponent, {
      //width: "50%",
      data: this.aquarium
    }).afterClosed().subscribe((snapshot: AquariumSnapshot) => {
      if (snapshot) {
        //add snapshot to table
      }
    });
  }

  clickDeleteAllSnapshots() {
    var dialog = this.dialog.open(ConfirmModalComponent, {
    });
    dialog.componentInstance.title = "Delete All Snapshots";
    dialog.componentInstance.body = "Are you sure you would like to remove all snapshots taken by your device? This operation will only remove snapshots that have been identified as automatic entries. This cannot be undone.";
    dialog.afterClosed().pipe(take(1)).subscribe((confirm: boolean) => {
      if (confirm) {
        this.deletingAllSnapshots = true;
        this.aquariumService.deleteAllSnapshots(this.aquarium.id).subscribe(res => {
          this.aquarium.snapshots = [];
          this.store.dispatch(new AquariumLoadSuccessAction([this.aquarium]));
          this.notifier.notify("success", "All snapshots have been deleted");
          this.deletingAllSnapshots = false;
        }, err => {
          this.notifier.notify("error", "Could not delete snapshots");
          this.deletingAllSnapshots = false;
        });
      }
    });
  }
}
