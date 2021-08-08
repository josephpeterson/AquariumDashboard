import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AquariumDeviceComponent } from './DeviceContainer/aquarium-device.component';
import { AuthGuard } from 'src/app/guards/AuthGuard';

const secondaryRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: AquariumDeviceComponent
    },
];

//taken from angular.io
//Only call RouterModule.forRoot in the root AppRoutingModule (or the AppModule if 
//that's where you register top level application routes). In any other module, you 
//must call the RouterModule.forChild method to register additional routes.

export const DeviceRoutes: ModuleWithProviders<any> = RouterModule.forChild(secondaryRoutes)