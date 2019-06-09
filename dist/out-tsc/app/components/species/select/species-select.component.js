import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getAllSpecies } from 'src/app/store/species/species.selector';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
var SpeciesSelectComponent = /** @class */ (function () {
    function SpeciesSelectComponent(store) {
        this.store = store;
        this.availableSpecies = [];
        this.species$ = this.store.pipe(select(getAllSpecies));
        this.componentLifeCycle$ = new Subject();
        this.selectControl = new FormControl();
        this.onChange = new EventEmitter();
    }
    SpeciesSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectControl.valueChanges.pipe(takeUntil(this.componentLifeCycle$)).subscribe(function (val) {
            _this.onChange.emit(val);
        });
        this.species$.pipe(takeUntil(this.componentLifeCycle$)).subscribe(function (species) {
            if (!species)
                return;
            _this.availableSpecies = species;
        });
    };
    SpeciesSelectComponent.prototype.ngOnDestory = function () {
        this.componentLifeCycle$.next();
        this.componentLifeCycle$.unsubscribe();
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], SpeciesSelectComponent.prototype, "onChange", void 0);
    SpeciesSelectComponent = tslib_1.__decorate([
        Component({
            selector: 'species-select',
            templateUrl: './species-select.component.html',
            styleUrls: ['./species-select.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], SpeciesSelectComponent);
    return SpeciesSelectComponent;
}());
export { SpeciesSelectComponent };
//# sourceMappingURL=species-select.component.js.map