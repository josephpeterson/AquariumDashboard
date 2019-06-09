import * as tslib_1 from "tslib";
import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { getConnectionError, getSelectedAquarium, getDidDelete, getDeleteError } from 'src/app/store/aquarium/aquarium.selector';
import { getAllSnapshots, isLoadingSnapshots, isDeletingSnapshot, isTakingSnapshot, getDidTake, getTakeError } from 'src/app/store/snapshot/snapshot.selector';
var MaintenanceComponentData = /** @class */ (function () {
    function MaintenanceComponentData(store) {
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
    }
    MaintenanceComponentData = tslib_1.__decorate([
        Injectable({
            providedIn: "root"
        }),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], MaintenanceComponentData);
    return MaintenanceComponentData;
}());
export { MaintenanceComponentData };
//# sourceMappingURL=maintenance.component.data.js.map