import * as tslib_1 from "tslib";
import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { isLoadingSnapshots, getConnectionError, getAllSnapshots, getDeleteError, isDeletingSnapshot, getDidDelete, getDidTake, getTakeError, isTakingSnapshot } from 'src/app/store/snapshot/snapshot.selector';
import { SnapshotLoadByAquariumAction } from 'src/app/store/snapshot/snapshot.actions';
var SnapshotPreviewScrollerComponentData = /** @class */ (function () {
    function SnapshotPreviewScrollerComponentData(store) {
        var _this = this;
        this.store = store;
        this.aquarium$ = this.store.pipe(select(getSelectedAquarium));
        this.snapshots$ = this.store.pipe(select(getAllSnapshots));
        this.loading$ = this.store.select(isLoadingSnapshots);
        this.connectionError$ = this.store.select(getConnectionError);
        this.deleting$ = this.store.select(isDeletingSnapshot);
        this.deleted$ = this.store.select(getDidDelete);
        this.deleteError$ = this.store.select(getDeleteError);
        this.taking$ = this.store.select(isTakingSnapshot);
        this.taken$ = this.store.select(getDidTake);
        this.takeError$ = this.store.select(getTakeError);
        this.aquarium$.subscribe(function (aq) {
            if (!aq)
                return;
            _this.aquarium = aq;
            //this.store.dispatch(new SnapshotResetAction());
            _this.store.dispatch(new SnapshotLoadByAquariumAction(aq.id));
        });
    }
    SnapshotPreviewScrollerComponentData = tslib_1.__decorate([
        Injectable({
            providedIn: "root"
        }),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], SnapshotPreviewScrollerComponentData);
    return SnapshotPreviewScrollerComponentData;
}());
export { SnapshotPreviewScrollerComponentData };
//# sourceMappingURL=species-table-list.component.js.map