import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AquariumSelectionComponent } from './components/containers/aquarium-selection/aquarium-selection.component';
import { MaintenanceComponent } from './components/containers/maintenance/maintenance.component';
import { FishComponent } from './components/containers/fish/fish.component';
import { LightingComponent } from './components/containers/lighting/lighting.component';
import { SettingsComponent } from './components/containers/settings/settings.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { DashboardComponent } from './components/containers/dashboard/dashboard.component';
var routes = [
    { path: '', component: AquariumSelectionComponent, pathMatch: 'full' },
    {
        path: ':aqId', component: NavMenuComponent, children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'fish',
                component: FishComponent
            },
            {
                path: 'lighting',
                component: LightingComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
            {
                path: 'maintenance/:tabId',
                component: MaintenanceComponent
            },
            {
                path: 'maintenance',
                component: MaintenanceComponent
            },
            {
                path: '',
                component: DashboardComponent
            }
        ]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            exports: [RouterModule],
            imports: [RouterModule.forRoot(routes)]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map