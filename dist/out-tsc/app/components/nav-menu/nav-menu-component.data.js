import * as tslib_1 from "tslib";
import { select, Store } from '@ngrx/store';
import { AquariumListAction, AquariumSelectionAction, AquariumLoadByIdAction } from 'src/app/store/aquarium/aquarium.actions';
import { Injectable } from '@angular/core';
import { getAllAquariums, isLoadingAquariums, getConnectionError, getSelectedAquarium, hasValidAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { take } from 'rxjs/operators';
var NavMenuComponentData = /** @class */ (function () {
    function NavMenuComponentData(store) {
        this.store = store;
        this.aquarium = this.store.select(getSelectedAquarium);
        this.aquariums = this.store.pipe(select(getAllAquariums));
        this.loading = this.store.select(isLoadingAquariums);
        this.connectionError = this.store.select(getConnectionError);
        this.hasValidAquarium = this.store.select(hasValidAquarium);
    }
    NavMenuComponentData.prototype.load = function (aquariumId) {
        this.select(aquariumId);
        this.store.dispatch(new AquariumListAction());
    };
    NavMenuComponentData.prototype.select = function (aquariumId) {
        var _this = this;
        this.store.dispatch(new AquariumSelectionAction(aquariumId));
        this.loading.pipe(take(1)).subscribe(function (val) {
            if (!val)
                _this.store.dispatch(new AquariumLoadByIdAction(aquariumId));
        });
    };
    NavMenuComponentData = tslib_1.__decorate([
        Injectable({
            providedIn: "root"
        }),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], NavMenuComponentData);
    return NavMenuComponentData;
}());
export { NavMenuComponentData };
//# sourceMappingURL=nav-menu-component.data.js.map