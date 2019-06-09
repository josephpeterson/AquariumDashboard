import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatTabGroup } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
var MaintenanceComponent = /** @class */ (function () {
    function MaintenanceComponent(store, dialog, route, router) {
        this.store = store;
        this.dialog = dialog;
        this.route = route;
        this.router = router;
        this.tabs = [{
                label: "Tasks",
                tabId: "tasks"
            }, {
                label: "Feeding",
                tabId: "feeding"
            },
            {
                label: "Parameters",
                tabId: "parameters"
            },
            {
                label: "Notifications",
                tabId: "notifications"
            }
        ];
        this.aquarium$ = this.store.pipe(select(getSelectedAquarium));
    }
    MaintenanceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.aquarium$.pipe(take(1)).subscribe(function (aquarium) {
            _this.aquarium = aquarium;
        });
        this.route.params.pipe(take(1)).subscribe(function (p) { return _this.setSelectedTab(p.tabId); });
    };
    MaintenanceComponent.prototype.setSelectedTab = function (tabId) {
        var idx = this.tabs.map(function (t) { return t.tabId; }).indexOf(tabId);
        this.tabber.selectedIndex = idx;
    };
    MaintenanceComponent.prototype.updateTabRoute = function () {
        var tab = this.tabs[this.tabber.selectedIndex];
        this.router.navigate([this.aquarium.id, 'maintenance', tab.tabId]);
    };
    tslib_1.__decorate([
        ViewChild("tabber"),
        tslib_1.__metadata("design:type", MatTabGroup)
    ], MaintenanceComponent.prototype, "tabber", void 0);
    MaintenanceComponent = tslib_1.__decorate([
        Component({
            selector: 'maintenance-page-component',
            templateUrl: './maintenance.component.html',
            styleUrls: ['./maintenance.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Store,
            MatDialog,
            ActivatedRoute,
            Router])
    ], MaintenanceComponent);
    return MaintenanceComponent;
}());
export { MaintenanceComponent };
//# sourceMappingURL=maintenance.component.js.map