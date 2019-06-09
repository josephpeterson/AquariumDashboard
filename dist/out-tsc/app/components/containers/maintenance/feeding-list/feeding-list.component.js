import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
var FOOD_BRANDS = [
    "brand1",
    "brand2",
    "brand3",
];
var FeedingListComponent = /** @class */ (function () {
    function FeedingListComponent(store) {
        var _this = this;
        this.store = store;
        this.aquarium$ = this.store.pipe(select(getSelectedAquarium));
        this.newFeeding = {
            foodBrand: new FormControl(),
            foodName: new FormControl(),
        };
        this.newFeedingFish = new FormControl();
        this.fish = ["fish1", "fish2", "fish3"];
        this.foodBrands = FOOD_BRANDS;
        this.aquarium$.subscribe(function (aq) {
            if (!aq)
                return;
            _this.aquarium = aq;
        });
    }
    FeedingListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filteredOptions = this.newFeeding.foodBrand.valueChanges
            .pipe(startWith(''), map(function (value) { return _this._filter(value); }));
    };
    FeedingListComponent.prototype._filter = function (value) {
        var filterValue = value.toLowerCase();
        return this.foodBrands.filter(function (option) { return option.toLowerCase().includes(filterValue); });
    };
    FeedingListComponent = tslib_1.__decorate([
        Component({
            selector: 'feeding-list',
            templateUrl: './feeding-list.component.html',
            styleUrls: ['./feeding-list.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], FeedingListComponent);
    return FeedingListComponent;
}());
export { FeedingListComponent };
//# sourceMappingURL=feeding-list.component.js.map