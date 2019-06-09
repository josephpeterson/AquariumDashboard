import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Injectable } from '@angular/core';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { isLoadingSnapshots, getConnectionError, getAllSnapshots, getDeleteError, isDeletingSnapshot, getDidDelete, getDidTake, getTakeError, isTakingSnapshot } from 'src/app/store/snapshot/snapshot.selector';
import { SnapshotLoadByAquariumAction, SnapshotTakeAction, SnapshotDeleteAction, SnapshotResetAction } from 'src/app/store/snapshot/snapshot.actions';
import { Aquarium } from 'src/app/models/Aquarium';
import { Snapshot } from 'src/app/models/Snapshot';

@Injectable({
    providedIn: "root"
})
export class SnapshotPreviewScrollerComponentData {
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
        this.aquarium$.subscribe(aq => {
            if (!aq) return;
            this.aquarium = aq;
            //this.store.dispatch(new SnapshotResetAction());
            this.store.dispatch(new SnapshotLoadByAquariumAction(aq.id));
        })
    }
} 