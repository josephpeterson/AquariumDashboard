import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateAquariumComponent } from '../../components/containers/AquariumContainer/create-aquarium/create-aquarium.component';
import { AuthGuard } from '../../guards/AuthGuard';
import { AquariumContainer } from '../../components/containers/AquariumContainer/aquarium-container.component';
import { DashboardComponent } from '../../components/containers/AquariumContainer/dashboard/dashboard.component';
import { AquariumParametersComponent } from '../../components/containers/AquariumContainer/parameters/aquarium-parameters.component';
import { ParametersWaterTestsListComponent } from '../../components/containers/AquariumContainer/parameters/water-tests/parameters-water-tests-list.component';
import { ParametersSnapshotListComponent } from '../../components/containers/AquariumContainer/parameters/snapshots/parameters-snapshot-list.component';
import { AquariumPhotosContainerComponent } from '../../components/containers/AquariumContainer/photos/aquarium-photos-container.component';
import { LightingComponent } from '../../components/containers/AquariumContainer/lighting/lighting.component';
import { SettingsComponent } from '../../components/containers/AquariumContainer/settings/settings.component';
import { MaintenanceComponent } from '../../components/containers/AquariumContainer/maintenance/maintenance.component';
import { PageNotFoundComponent } from '../SharedModule/page-not-found/page-not-found.component';
import { OverviewContainer } from './OverviewContainer/overview-container.component';

const secondaryRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: OverviewContainer
    },
];

//taken from angular.io
//Only call RouterModule.forRoot in the root AppRoutingModule (or the AppModule if 
//that's where you register top level application routes). In any other module, you 
//must call the RouterModule.forChild method to register additional routes.

export const OverviewRoutes: ModuleWithProviders = RouterModule.forChild(secondaryRoutes)