import * as tslib_1 from "tslib";
import { FishTableListComponentData } from './fish-table-list.component.data';
import { Component, ViewChild, Input, Output } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { EventEmitter } from 'events';
var FishTableListComponent = /** @class */ (function () {
    function FishTableListComponent(dataSource) {
        this.dataSource = dataSource;
        this.loading$ = this.dataSource.loading$;
        this.selection = new SelectionModel(true, []);
        //Columns
        this.columns = [
            { name: 'select', visible: true },
            { name: 'id', label: "ID", visible: true },
            { name: 'name', label: 'Full Name', visible: true },
            { name: 'description', label: 'Description', visible: true },
            { name: 'date', label: 'Adoption Date', visible: true },
            { name: 'speciesId', label: 'Species Id', visible: true },
            { name: 'aquariumId', label: 'Assigned Aquarium', visible: false },
        ];
        this.displayedColumns = this.columns.filter(function (col) { return col.visible; }).map(function (col) { return col.name; });
        //Event handlers
        this.rowClicked = new EventEmitter();
    }
    FishTableListComponent.prototype.ngOnInit = function () {
        if (this.searchBox)
            this.bindSearchBox();
        this.dataSource.paginator = this.paginator;
    };
    FishTableListComponent.prototype.updateSort = function () {
        this.dataSource.sort = this.sort;
    };
    FishTableListComponent.prototype.toggleSelection = function (row) {
        this.selection.clear();
        this.selection.toggle(row);
    };
    FishTableListComponent.prototype.getSelectedItems = function () {
        return this.selection.selected[0];
    };
    //Search Support
    FishTableListComponent.prototype.bindSearchBox = function () {
        this.searchBox.addEventListener("keyup", this.applyFilter.bind(this));
        this.searchBox.value = this.dataSource.filter;
    };
    FishTableListComponent.prototype.getFilterString = function () {
        return this.searchBox.value.trim().toLowerCase();
    };
    FishTableListComponent.prototype.applyFilter = function () {
        this.dataSource.filter = this.getFilterString();
    };
    FishTableListComponent.prototype.rowClickHandler = function (event, row) {
        //this.rowClicked.emit([event,row]);
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], FishTableListComponent.prototype, "paginator", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], FishTableListComponent.prototype, "sort", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], FishTableListComponent.prototype, "displayedColumns", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", HTMLInputElement)
    ], FishTableListComponent.prototype, "searchBox", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], FishTableListComponent.prototype, "rowClicked", void 0);
    FishTableListComponent = tslib_1.__decorate([
        Component({
            selector: 'fish-table-list',
            templateUrl: './fish-table-list.component.html',
            styleUrls: ['./fish-table-list.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [FishTableListComponentData])
    ], FishTableListComponent);
    return FishTableListComponent;
}());
export { FishTableListComponent };
//# sourceMappingURL=fish-table-list.component.js.map