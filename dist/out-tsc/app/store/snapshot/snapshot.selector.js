import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as SnapshotReducer from './snapshot.reducer';
export var SnapshotState = createFeatureSelector("snapshots");
export var getAllSnapshots = createSelector(SnapshotState, SnapshotReducer.selectAll);
export var getSnapshotsById = function (targetId) { return createSelector(SnapshotState, function (state) {
    var snapshots = [];
    for (var i = 0; i < state.ids.length; i++) {
        var id = state.ids[i];
        var snap = state.entities[id];
        if (snap.aquariumId == targetId)
            snapshots.push(snap);
    }
    return snapshots;
}); };
export var isLoadingSnapshots = createSelector(SnapshotState, function (state) { return state.loading; });
export var getConnectionError = createSelector(SnapshotState, function (state) { return state.connectionError; });
/* Delete */
export var isDeletingSnapshot = createSelector(SnapshotState, function (state) { return state.deleting; });
export var getDidDelete = createSelector(SnapshotState, function (state) { return state.deleted; });
export var getDeleteError = createSelector(SnapshotState, function (state) { return state.deleteError; });
/* Take */
export var isTakingSnapshot = createSelector(SnapshotState, function (state) { return state.taking; });
export var getDidTake = createSelector(SnapshotState, function (state) { return state.taken; });
export var getTakeError = createSelector(SnapshotState, function (state) { return state.takeError; });
//# sourceMappingURL=snapshot.selector.js.map