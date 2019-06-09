import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavMenuComponentData } from './nav-menu-component.data';
var NavMenuComponent = /** @class */ (function () {
    function NavMenuComponent(data, route, router) {
        this.data = data;
        this.route = route;
        this.router = router;
        this.isExpanded = false;
        this.loading$ = this.data.loading;
        this.aquariums$ = this.data.aquariums;
        this.aquarium$ = this.data.aquarium;
        this.hasValidAquarium = this.data.hasValidAquarium;
    }
    NavMenuComponent.prototype.collapse = function () {
        this.isExpanded = false;
    };
    NavMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (p) {
            _this.data.load(p.aqId);
        });
    };
    NavMenuComponent.prototype.selectAquarium = function (val) {
        var url = this.router.url;
        var path = url.split("/").splice(2);
        this.router.navigate([val].concat(path));
    };
    NavMenuComponent.prototype.toggle = function () {
        this.isExpanded = !this.isExpanded;
    };
    NavMenuComponent = tslib_1.__decorate([
        Component({
            selector: 'app-nav-menu',
            templateUrl: './nav-menu.component.html',
            styleUrls: ['./nav-menu.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [NavMenuComponentData,
            ActivatedRoute,
            Router])
    ], NavMenuComponent);
    return NavMenuComponent;
}());
export { NavMenuComponent };
//# sourceMappingURL=nav-menu.component.js.map