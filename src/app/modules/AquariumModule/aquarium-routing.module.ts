import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateAquariumComponent } from './create-aquarium/create-aquarium.component';
import { AuthGuard } from '../../guards/AuthGuard';
import { AquariumContainer } from './AquariumContainer/aquarium-container.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AquariumParametersComponent } from './parameters/aquarium-parameters.component';
import { ParametersWaterTestsListComponent } from './parameters/water-tests/parameters-water-tests-list.component';
import { ParametersSnapshotListComponent } from './parameters/snapshots/parameters-snapshot-list.component';
import { AquariumPhotosContainerComponent } from './photos/aquarium-photos-container.component';
import { LightingComponent } from './lighting/lighting.component';
import { SettingsComponent } from './settings/settings.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { PageNotFoundComponent } from '../SharedModule/page-not-found/page-not-found.component';
import { AquariumsContainer } from './AquariumsContainer/aquariums-container.component';

const secondaryRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: AquariumsContainer
    },
    {
        path: 'new',
        component: CreateAquariumComponent,
        runGuardsAndResolvers: "always",
        canActivate: [AuthGuard],
    },
    {
        path: ':aqId',
        component: AquariumContainer,
        runGuardsAndResolvers: "always",
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
           /* {
                path: 'fish',
                component: AquariumFishComponent
            }, */
            {
                path: 'parameters',
                component: AquariumParametersComponent,
                children: [
                    {
                        path: 'water',
                        component: ParametersWaterTestsListComponent
                    },
                    {
                        path: 'snapshots',
                        component: ParametersSnapshotListComponent
                    },
                    {
                        path: '',
                        component: ParametersWaterTestsListComponent
                    }]
            },
            {
                path: 'photos',
                component: AquariumPhotosContainerComponent
            },
            {
                path: 'device',
                loadChildren: '../DeviceModule/device.module#DeviceModule',
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
    },
];

//taken from angular.io
//Only call RouterModule.forRoot in the root AppRoutingModule (or the AppModule if 
//that's where you register top level application routes). In any other module, you 
//must call the RouterModule.forChild method to register additional routes.

export const AquariumRoutes: ModuleWithProviders = RouterModule.forChild(secondaryRoutes)