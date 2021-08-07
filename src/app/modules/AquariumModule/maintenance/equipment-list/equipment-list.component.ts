import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { select, Store } from '@ngrx/store';
import { getSelectedAquarium, getConnectionError, getDidDelete, getDeleteError } from 'src/app/store/aquarium/aquarium.selector';
import { getAllSnapshots, isLoadingSnapshots, isDeletingSnapshot, isTakingSnapshot, getDidTake, getTakeError } from 'src/app/store/snapshot/snapshot.selector';
import { AppState } from 'src/app/app.state';
import { SnapshotResetAction, SnapshotLoadByAquariumAction, SnapshotDeleteAction } from 'src/app/store/snapshot/snapshot.actions';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { SnapshotTableListComponent } from 'src/app/modules/SharedModule/data/snapshot/table-list/snapshot-table-list.component';
import { ManageSnapshotModal } from 'src/app/modules/SharedModule/modals/manage-snapshot-modal/manage-snapshot-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent {


  constructor(private store: Store<AppState>,
    private dialog: MatDialog) {

  }
}