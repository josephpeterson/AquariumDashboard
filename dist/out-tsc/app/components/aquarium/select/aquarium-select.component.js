import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { getAllAquariums } from 'src/app/store/aquarium/aquarium.selector';
var AquariumSelectComponent = /** @class */ (function () {
    function AquariumSelectComponent(store) {
        this.store = store;
        this.availableAquariums = [];
        this.aquariums$ = this.store.pipe(select(getAllAquariums));
        this.componentLifeCycle$ = new Subject();
        this.selectControl = new FormControl();
        this.onChange = new EventEmitter();
    }
    AquariumSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectControl.valueChanges.pipe(takeUntil(this.componentLifeCycle$)).subscribe(function (val) {
            _this.onChange.emit(val);
        });
        this.aquariums$.pipe(takeUntil(this.componentLifeCycle$)).subscribe(function (aquariums) {
            if (!aquariums)
                return;
            _this.availableAquariums = aquariums;
        });
    };
    AquariumSelectComponent.prototype.ngOnDestory = function () {
        this.componentLifeCycle$.next();
        this.componentLifeCycle$.unsubscribe();
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], AquariumSelectComponent.prototype, "onChange", void 0);
    AquariumSelectComponent = tslib_1.__decorate([
        Component({
            selector: 'aquarium-select',
            templateUrl: './aquarium-select.component.html',
            styleUrls: ['./aquarium-select.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], AquariumSelectComponent);
    return AquariumSelectComponent;
}());
export { AquariumSelectComponent };
//# sourceMappingURL=aquarium-select.component.js.map