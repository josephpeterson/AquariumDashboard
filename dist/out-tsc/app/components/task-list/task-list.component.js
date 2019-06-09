import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
var TaskListComponent = /** @class */ (function () {
    function TaskListComponent(dialog) {
        this.dialog = dialog;
    }
    TaskListComponent.prototype.ngOnInit = function () {
    };
    TaskListComponent = tslib_1.__decorate([
        Component({
            selector: 'task-list',
            templateUrl: './task-list.component.html',
            styleUrls: ['./task-list.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog])
    ], TaskListComponent);
    return TaskListComponent;
}());
export { TaskListComponent };
//# sourceMappingURL=task-list.component.js.map