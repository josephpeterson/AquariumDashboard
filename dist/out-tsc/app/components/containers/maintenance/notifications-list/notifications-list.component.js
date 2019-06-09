import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getSelectedAquarium, getConnectionError, getDidDelete, getDeleteError } from 'src/app/store/aquarium/aquarium.selector';
import { getAllSnapshots, isLoadingSnapshots, isDeletingSnapshot, isTakingSnapshot, getDidTake, getTakeError } from 'src/app/store/snapshot/snapshot.selector';
var NotificationsListComponent = /** @class */ (function () {
    function NotificationsListComponent(store) {
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
    NotificationsListComponent = tslib_1.__decorate([
        Component({
            selector: 'notifications-list',
            templateUrl: './notifications-list.component.html',
            styleUrls: ['./notifications-list.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], NotificationsListComponent);
    return NotificationsListComponent;
}());
export { NotificationsListComponent };
//# sourceMappingURL=notifications-list.component.js.map