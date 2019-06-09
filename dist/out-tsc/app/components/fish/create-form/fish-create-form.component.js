import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getSelectedAquarium, isCreatingFish, getFishCreateError } from 'src/app/store/aquarium/aquarium.selector';
import { getAllSpecies } from 'src/app/store/species/species.selector';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Fish } from 'src/app/models/Fish';
import { AquariumAddFishAction } from 'src/app/store/aquarium/aquarium.actions';
import { NotifierService } from 'angular-notifier';
var FishCreateFormComponent = /** @class */ (function () {
    function FishCreateFormComponent(store, notifier) {
        this.store = store;
        this.notifier = notifier;
        this.availableSpecies = [];
        this.aquarium$ = this.store.pipe(select(getSelectedAquarium));
        this.adding$ = this.store.select(isCreatingFish);
        this.addError$ = this.store.select(getFishCreateError);
        this.species$ = this.store.pipe(select(getAllSpecies));
        this.componentLifeCycle$ = new Subject();
        this.newFish = new Fish();
    }
    FishCreateFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.aquarium$.pipe(takeUntil(this.componentLifeCycle$)).subscribe(function (aq) {
            if (!aq)
                return;
            _this.aquarium = aq;
        });
        this.species$.pipe(takeUntil(this.componentLifeCycle$)).subscribe(function (species) {
            if (!species)
                return;
            _this.availableSpecies = species;
        });
    };
    FishCreateFormComponent.prototype.ngOnDestory = function () {
        this.componentLifeCycle$.next();
        this.componentLifeCycle$.unsubscribe();
    };
    FishCreateFormComponent.prototype.clickCreateFish = function () {
        var _this = this;
        var newFish = this.newFish;
        this.store.dispatch(new AquariumAddFishAction(newFish));
        this.addError$.pipe(take(2)).subscribe(function (err) {
            if (err) {
                adding = false;
                _this.notifier.notify("error", "Unable to add fish to aquarium.");
                console.log(err);
            }
        });
        var adding = true;
        this.adding$.pipe(take(2)).subscribe(function (val) {
            if (!val && adding)
                _this.notifier.notify("success", "Added fish to aquarium.");
        });
    };
    FishCreateFormComponent.prototype.selectSpecies = function (species) {
        if (species)
            this.newFish.speciesId = species.id;
        else
            this.newFish.speciesId = null;
    };
    FishCreateFormComponent.prototype.selectAquarium = function (aquarium) {
        if (aquarium)
            this.newFish.aquariumId = aquarium.id;
        else
            this.newFish.aquariumId = null;
    };
    FishCreateFormComponent = tslib_1.__decorate([
        Component({
            selector: 'fish-create-form',
            templateUrl: './fish-create-form.component.html',
            styleUrls: ['./fish-create-form.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Store, NotifierService])
    ], FishCreateFormComponent);
    return FishCreateFormComponent;
}());
export { FishCreateFormComponent };
//# sourceMappingURL=fish-create-form.component.js.map