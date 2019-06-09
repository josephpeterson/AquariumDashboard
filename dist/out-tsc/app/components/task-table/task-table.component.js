import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
var ELEMENT_DATA = [
    { id: 1, priority: 1, type: "Water Change", issueDate: new Date(), dueDate: new Date() },
    { id: 1, priority: 1, type: "Parameter Test", issueDate: new Date(), dueDate: new Date() },
    { id: 1, priority: 1, type: "Feed Fish", issueDate: new Date(), dueDate: new Date() },
    { id: 1, priority: 1, type: "Parameter Test", issueDate: new Date(), dueDate: new Date() },
    { id: 1, priority: 1, type: "Water Change", issueDate: new Date(), dueDate: new Date() },
    { id: 1, priority: 1, type: "Water Change", issueDate: new Date(), dueDate: new Date() },
];
var TaskTableComponent = /** @class */ (function () {
    function TaskTableComponent(dialog) {
        this.dialog = dialog;
        this.displayedColumns = ['position', 'name', 'symbol'];
        this.dataSource = ELEMENT_DATA;
    }
    TaskTableComponent.prototype.ngOnInit = function () {
    };
    TaskTableComponent = tslib_1.__decorate([
        Component({
            selector: 'task-table',
            templateUrl: './task-table.component.html',
            styleUrls: ['./task-table.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog])
    ], TaskTableComponent);
    return TaskTableComponent;
}());
export { TaskTableComponent };
//# sourceMappingURL=task-table.component.js.map