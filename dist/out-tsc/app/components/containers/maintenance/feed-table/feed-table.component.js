import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { isLoadingAquariums } from 'src/app/store/aquarium/aquarium.selector';
import { AquariumFeeding } from '../../../../models/AquariumFeeding';
import { MatTableDataSource } from '@angular/material';
var ELEMENT_DATA = [
    new AquariumFeeding(),
    new AquariumFeeding(),
    new AquariumFeeding(),
    new AquariumFeeding(),
    new AquariumFeeding(),
];
var FeedTableComponent = /** @class */ (function () {
    function FeedTableComponent(store) {
        this.store = store;
        this.loading$ = this.store.select(isLoadingAquariums);
        this.columns = [
            { label: "Food", name: "food" },
            { label: "Amount", name: "amount" },
            { label: "Date", name: "date" },
        ];
        this.displayedColumns = ['amount', 'food', 'date'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    }
    FeedTableComponent = tslib_1.__decorate([
        Component({
            selector: 'feed-table',
            templateUrl: './feed-table.component.html',
            styleUrls: ['./feed-table.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], FeedTableComponent);
    return FeedTableComponent;
}());
export { FeedTableComponent };
//# sourceMappingURL=feed-table.component.js.map