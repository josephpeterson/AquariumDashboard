import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
var FishComponent = /** @class */ (function () {
    function FishComponent(dialog) {
        this.dialog = dialog;
    }
    FishComponent.prototype.ngOnInit = function () {
    };
    FishComponent = tslib_1.__decorate([
        Component({
            selector: 'fish-page-component',
            templateUrl: './fish.component.html',
            styleUrls: ['./fish.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog])
    ], FishComponent);
    return FishComponent;
}());
export { FishComponent };
//# sourceMappingURL=fish.component.js.map