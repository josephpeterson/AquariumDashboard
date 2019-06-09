import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var ConfirmModalComponent = /** @class */ (function () {
    function ConfirmModalComponent() {
        this.title = "This is the default title";
        this.body = "This is the default body";
    }
    ConfirmModalComponent.prototype.ngOnInit = function () {
    };
    ConfirmModalComponent = tslib_1.__decorate([
        Component({
            selector: 'confirm-modal',
            templateUrl: './confirm-modal.component.html',
            styleUrls: ['./confirm-modal.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ConfirmModalComponent);
    return ConfirmModalComponent;
}());
export { ConfirmModalComponent };
//# sourceMappingURL=confirm-modal.component.js.map