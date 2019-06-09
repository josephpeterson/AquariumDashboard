import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
var OperationsComponent = /** @class */ (function () {
    function OperationsComponent(dialog) {
        this.dialog = dialog;
    }
    OperationsComponent.prototype.ngOnInit = function () {
    };
    OperationsComponent = tslib_1.__decorate([
        Component({
            selector: 'operations',
            templateUrl: './operations.component.html',
            styleUrls: ['./operations.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog])
    ], OperationsComponent);
    return OperationsComponent;
}());
export { OperationsComponent };
//# sourceMappingURL=operations.component.js.map