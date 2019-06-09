import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getDeleteError, isDeletingSnapshot } from 'src/app/store/snapshot/snapshot.selector';
import { SnapshotDeleteAction } from 'src/app/store/snapshot/snapshot.actions';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
var SnapshotDeleteButtonComponent = /** @class */ (function () {
    function SnapshotDeleteButtonComponent(notifier, store) {
        this.notifier = notifier;
        this.store = store;
        //Store data
        this.aquarium$ = this.store.select(getSelectedAquarium);
        this.deleting$ = this.store.select(isDeletingSnapshot);
        this.deleteError$ = this.store.select(getDeleteError);
        this.faTrashAlt = faTrashAlt;
    }
    SnapshotDeleteButtonComponent.prototype.deleteSnapshot = function () {
        var _this = this;
        this.store.dispatch(new SnapshotDeleteAction(this.snapshot));
        this.deleteError$.pipe(take(2)).subscribe(function (error) {
            if (error)
                _this.handleError(error);
        });
    };
    SnapshotDeleteButtonComponent.prototype.handleError = function (error) {
        this.notifier.notify("error", "Could not delete snapshot");
        console.log(error.message, error);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", AquariumSnapshot)
    ], SnapshotDeleteButtonComponent.prototype, "snapshot", void 0);
    SnapshotDeleteButtonComponent = tslib_1.__decorate([
        Component({
            selector: 'snapshot-delete-button',
            templateUrl: './snapshot-delete-button.component.html',
            styleUrls: ['./snapshot-delete-button.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [NotifierService, Store])
    ], SnapshotDeleteButtonComponent);
    return SnapshotDeleteButtonComponent;
}());
export { SnapshotDeleteButtonComponent };
//# sourceMappingURL=snapshot-delete-button.component.js.map