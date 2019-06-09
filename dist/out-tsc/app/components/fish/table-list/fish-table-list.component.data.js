import * as tslib_1 from "tslib";
import { MatTableDataSource } from '@angular/material/table';
import { isLoadingAquariums, getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { SpeciesLoadAction } from 'src/app/store/species/species.actions';
var FishTableListComponentData = /** @class */ (function (_super) {
    tslib_1.__extends(FishTableListComponentData, _super);
    function FishTableListComponentData(store) {
        var _this = _super.call(this) || this;
        _this.store = store;
        _this.aquarium$ = _this.store.select(getSelectedAquarium);
        _this.loading$ = _this.store.select(isLoadingAquariums);
        _this.componentLifeCycle = new Subject();
        _this.aquarium$.pipe(takeUntil(_this.componentLifeCycle)).subscribe(function (aq) {
            if (!aq.fish)
                return;
            console.log(aq);
            _this.data = aq.fish;
        });
        //Load species store (it may not be loaded)
        _this.store.dispatch(new SpeciesLoadAction());
        return _this;
    }
    FishTableListComponentData.prototype.ngOnDestroy = function () {
        this.componentLifeCycle.next();
        this.componentLifeCycle.unsubscribe();
    };
    FishTableListComponentData = tslib_1.__decorate([
        Injectable({
            providedIn: "root"
        }),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], FishTableListComponentData);
    return FishTableListComponentData;
}(MatTableDataSource));
export { FishTableListComponentData };
//# sourceMappingURL=fish-table-list.component.data.js.map