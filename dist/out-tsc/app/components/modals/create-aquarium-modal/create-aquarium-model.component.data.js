import * as tslib_1 from "tslib";
import { select, Store } from '@ngrx/store';
import { AquariumCreateAction, AquariumCreateResetAction } from 'src/app/store/aquarium/aquarium.actions';
import { Injectable } from '@angular/core';
import { getAllAquariums, getConnectionError, getSelectedAquarium, getAquariumWasCreated, getAquariumCreateError, isCreatingAquarium } from 'src/app/store/aquarium/aquarium.selector';
var CreateAquariumModalComponentData = /** @class */ (function () {
    function CreateAquariumModalComponentData(store) {
        this.store = store;
        this.aquarium = this.store.pipe(select(getSelectedAquarium));
        this.aquariums = this.store.pipe(select(getAllAquariums));
        this.loading = this.store.select(isCreatingAquarium);
        this.connectionError = this.store.select(getConnectionError);
        this.wasCreated = this.store.select(getAquariumWasCreated);
        this.createError = this.store.select(getAquariumCreateError);
    }
    CreateAquariumModalComponentData.prototype.create = function (aquarium) {
        this.store.dispatch(new AquariumCreateAction(aquarium));
    };
    CreateAquariumModalComponentData.prototype.reset = function () {
        this.store.dispatch(new AquariumCreateResetAction());
    };
    CreateAquariumModalComponentData = tslib_1.__decorate([
        Injectable({
            providedIn: "root"
        }),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], CreateAquariumModalComponentData);
    return CreateAquariumModalComponentData;
}());
export { CreateAquariumModalComponentData };
//# sourceMappingURL=create-aquarium-model.component.data.js.map