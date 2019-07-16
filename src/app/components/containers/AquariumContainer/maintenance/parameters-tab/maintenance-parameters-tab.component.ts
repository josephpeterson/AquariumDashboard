import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { select, Store } from '@ngrx/store';
import { getSelectedAquarium, getConnectionError, getDidDelete, getDeleteError } from 'src/app/store/aquarium/aquarium.selector';
import { getAllSnapshots, isLoadingSnapshots, isDeletingSnapshot, isTakingSnapshot, getDidTake, getTakeError } from 'src/app/store/snapshot/snapshot.selector';
import { AppState } from 'src/app/app.state';
import { SnapshotResetAction, SnapshotLoadByAquariumAction, SnapshotDeleteAction } from 'src/app/store/snapshot/snapshot.actions';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { SnapshotTableListComponent } from 'src/app/components/data/snapshot/table-list/snapshot-table-list.component';

@Component({
    selector: 'maintenance-parameters-tab',
    templateUrl: './maintenance-parameters-tab.component.html',
    styleUrls: ['./maintenance-parameters-tab.component.scss']
  })
export class ParameterTabComponent {
    @Input() aquarium: Aquarium;
    @ViewChild(SnapshotTableListComponent) snapshotTable: SnapshotTableListComponent;

    public selectedSnapshots: AquariumSnapshot[] = [];
    
    constructor(private store: Store<AppState>) {
 
    }

    selectSnapshot(data) {
      this.selectedSnapshots = this.snapshotTable.getSelectedItems();
    }
}