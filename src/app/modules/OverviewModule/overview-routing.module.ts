import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../guards/AuthGuard';
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

export const OverviewRoutes: ModuleWithProviders<any> = RouterModule.forChild(secondaryRoutes)