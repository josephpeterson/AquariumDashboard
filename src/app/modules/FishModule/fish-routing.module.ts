import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../guards/AuthGuard';
import { FishContainer } from './FishContainer/fish-container.component';
import { FishDetailViewComponent } from '../SharedModule/fish-detail-view/fish-detail-view.component';
import { FishEditViewComponent } from './fish-edit-view/fish-edit-view.component';

const secondaryRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: FishContainer
    },
    {
        path: ':fishId',
        component: FishContainer,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'feeding',
                component: FishDetailViewComponent
            },
            {
                path: 'photos',
                component: FishDetailViewComponent
            },
            {
                path: 'edit',
                component: FishEditViewComponent
            },
            {
                path: '',
                component: FishDetailViewComponent
            }
        ]
    },
];

//taken from angular.io
//Only call RouterModule.forRoot in the root AppRoutingModule (or the AppModule if 
//that's where you register top level application routes). In any other module, you 
//must call the RouterModule.forChild method to register additional routes.

export const FishRoutes: ModuleWithProviders = RouterModule.forChild(secondaryRoutes)