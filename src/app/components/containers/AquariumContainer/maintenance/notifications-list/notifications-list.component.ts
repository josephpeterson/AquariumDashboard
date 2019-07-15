import { Component } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { select, Store } from '@ngrx/store';
import { getSelectedAquarium, getConnectionError, getDidDelete, getDeleteError } from 'src/app/store/aquarium/aquarium.selector';
import { getAllSnapshots, isLoadingSnapshots, isDeletingSnapshot, isTakingSnapshot, getDidTake, getTakeError } from 'src/app/store/snapshot/snapshot.selector';
import { AppState } from 'src/app/app.state';
import { SnapshotResetAction, SnapshotLoadByAquariumAction, SnapshotDeleteAction } from 'src/app/store/snapshot/snapshot.actions';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';

@Component({
    selector: 'notifications-list',
    templateUrl: './notifications-list.component.html',
    styleUrls: ['./notifications-list.component.scss']
  })
export class NotificationsListComponent {
    public aquarium: Aquarium;

    public aquarium$ = this.store.pipe(select(getSelectedAquarium));
    public snapshots$ = this.store.pipe(select(getAllSnapshots));
    public loading$ = this.store.select(isLoadingSnapshots);
    public connectionError$ = this.store.select(getConnectionError);
    public deleting$ = this.store.select(isDeletingSnapshot);
    public deleted$ = this.store.select(getDidDelete);
    public deleteError$ = this.store.select(getDeleteError);
    public taking$ = this.store.select(isTakingSnapshot);
    public taken$ = this.store.select(getDidTake);
    public takeError$ = this.store.select(getTakeError);


    constructor(private store: Store<AppState>) {
    }

}