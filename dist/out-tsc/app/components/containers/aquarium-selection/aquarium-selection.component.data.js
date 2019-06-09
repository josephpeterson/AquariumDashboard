import * as tslib_1 from "tslib";
import { select, Store } from '@ngrx/store';
import { AquariumListAction, AquariumSelectionAction } from 'src/app/store/aquarium/aquarium.actions';
import { Injectable } from '@angular/core';
import { getAllAquariums, isLoadingAquariums, getConnectionError, getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
var AquariumSelectionComponentData = /** @class */ (function () {
    function AquariumSelectionComponentData(store) {
        this.store = store;
        this.aquarium = this.store.pipe(select(getSelectedAquarium));
        this.aquariums = this.store.pipe(select(getAllAquariums));
        this.loading = this.store.select(isLoadingAquariums);
        this.connectionError = this.store.select(getConnectionError);
    }
    AquariumSelectionComponentData.prototype.load = function () {
        this.store.dispatch(new AquariumListAction());
    };
    AquariumSelectionComponentData.prototype.select = function (aquarium) {
        this.store.dispatch(new AquariumSelectionAction(aquarium.id));
    };
    AquariumSelectionComponentData = tslib_1.__decorate([
        Injectable({
            providedIn: "root"
        }),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], AquariumSelectionComponentData);
    return AquariumSelectionComponentData;
}());
export { AquariumSelectionComponentData };
//# sourceMappingURL=aquarium-selection.component.data.js.map