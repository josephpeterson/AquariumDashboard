import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Aquarium } from 'src/app/models/Aquarium';
import { Injectable } from '@angular/core';
import { getAllAquariums, isLoadingAquariums, getConnectionError, getSelectedAquarium, hasValidAquarium, getDidDelete, getDeleteError } from 'src/app/store/aquarium/aquarium.selector';
import { Observable } from 'rxjs';
import { getAllSnapshots, isLoadingSnapshots, isDeletingSnapshot, isTakingSnapshot, getDidTake, getTakeError } from 'src/app/store/snapshot/snapshot.selector';
import { SnapshotResetAction, SnapshotLoadByAquariumAction, SnapshotTakeAction, SnapshotDeleteAction } from 'src/app/store/snapshot/snapshot.actions';
import { Snapshot } from 'src/app/models/Snapshot';
@Injectable({
    providedIn: "root"
})
export class MaintenanceComponentData {
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