import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { isTakingSnapshot, getTakeError } from 'src/app/store/snapshot/snapshot.selector';
import { SnapshotTakeAction } from 'src/app/store/snapshot/snapshot.actions';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
var SnapshotTakeButtonComponent = /** @class */ (function () {
    function SnapshotTakeButtonComponent(notifier, store) {
        this.notifier = notifier;
        this.store = store;
        this.faCamera = faCamera;
        //Store data
        this.aquarium$ = this.store.select(getSelectedAquarium);
        this.taking$ = this.store.select(isTakingSnapshot);
        this.takeError$ = this.store.select(getTakeError);
    }
    SnapshotTakeButtonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.aquarium$.pipe(take(1)).subscribe(function (aq) { return _this.aquarium = aq; });
    };
    SnapshotTakeButtonComponent.prototype.takeSnapshot = function () {
        var _this = this;
        this.store.dispatch(new SnapshotTakeAction(this.aquarium));
        //Bind error
        var err = false;
        this.takeError$.pipe(take(2)).subscribe(function (error) {
            if (error) {
                _this.notifier.notify("error", error.message);
                err = true;
            }
        });
        var start = Date.now();
        this.taking$.pipe(take(2)).subscribe(function (val) {
            if (val || err)
                return;
            var eta = Date.now() - start;
            _this.notifier.notify("success", "Snapshot taken successfully (" + eta + "ms)");
        });
    };
    SnapshotTakeButtonComponent = tslib_1.__decorate([
        Component({
            selector: 'snapshot-take-button',
            templateUrl: './snapshot-take-button.component.html',
            styleUrls: ['./snapshot-take-button.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [NotifierService, Store])
    ], SnapshotTakeButtonComponent);
    return SnapshotTakeButtonComponent;
}());
export { SnapshotTakeButtonComponent };
//# sourceMappingURL=snapshot-take-button.component.js.map