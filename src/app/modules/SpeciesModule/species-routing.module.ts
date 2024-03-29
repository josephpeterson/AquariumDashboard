import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeciesModule } from './species.module';

import { SpeciesContainer } from './SpeciesContainer/species-container.component';

const secondaryRoutes: Routes = [
    {
        path: '',
        //canActivate: [AuthGuard],
        component: SpeciesContainer
    },
    {
        path: ':speciesId',
        //canActivate: [AuthGuard],
        component: SpeciesContainer
      },
];

//taken from angular.io
//Only call RouterModule.forRoot in the root AppRoutingModule (or the AppModule if 
//that's where you register top level application routes). In any other module, you 
//must call the RouterModule.forChild method to register additional routes.

export const SpeciesRoutes: ModuleWithProviders<SpeciesModule> = RouterModule.forChild(secondaryRoutes)