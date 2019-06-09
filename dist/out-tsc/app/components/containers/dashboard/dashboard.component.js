import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(dialog) {
        this.dialog = dialog;
        this.faExclamationTriangle = faExclamationTriangle;
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent = tslib_1.__decorate([
        Component({
            selector: 'dashboard-page-component',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog])
    ], DashboardComponent);
    return DashboardComponent;
}());
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map