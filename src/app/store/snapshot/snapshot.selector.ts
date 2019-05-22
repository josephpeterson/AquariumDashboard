import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as SnapshotReducer from './snapshot.reducer';


export const SnapshotState = createFeatureSelector<SnapshotReducer.SnapshotState>("snapshots");

export const getAllSnapshots = createSelector(SnapshotState, SnapshotReducer.selectAll);

export const getSnapshotsById = (targetId: number) => createSelector(SnapshotState,
    (state: SnapshotReducer.SnapshotState) => {
        var snapshots = [];
        for(var i=0;i<state.ids.length;i++)
        {
            var id = state.ids[i];
            var snap = state.entities[id];
            if (snap.aquariumId == targetId)
                snapshots.push(snap);
        }
        return snapshots;
    });

export const isLoadingSnapshots = createSelector(SnapshotState, (state: SnapshotReducer.SnapshotState) => state.loading);
export const getConnectionError = createSelector(SnapshotState, (state: SnapshotReducer.SnapshotState) => state.connectionError);

/* Delete */
export const isDeletingSnapshot = createSelector(SnapshotState, (state: SnapshotReducer.SnapshotState) => state.deleting);
export const getDidDelete = createSelector(SnapshotState, (state: SnapshotReducer.SnapshotState) => state.deleted);
export const getDeleteError = createSelector(SnapshotState, (state: SnapshotReducer.SnapshotState) => state.deleteError);

/* Take */
export const isTakingSnapshot = createSelector(SnapshotState, (state: SnapshotReducer.SnapshotState) => state.taking);
export const getDidTake = createSelector(SnapshotState, (state: SnapshotReducer.SnapshotState) => state.taken);
export const getTakeError = createSelector(SnapshotState, (state: SnapshotReducer.SnapshotState) => state.takeError);