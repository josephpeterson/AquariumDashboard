import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/AuthGuard';
import { CalendarContainerComponent } from './calendar-container/calendar-container.component';

const secondaryRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: CalendarContainerComponent,
    },
];

//taken from angular.io
//Only call RouterModule.forRoot in the root AppRoutingModule (or the AppModule if 
//that's where you register top level application routes). In any other module, you 
//must call the RouterModule.forChild method to register additional routes.

export const CalendarRoutes: ModuleWithProviders<any> = RouterModule.forChild(secondaryRoutes)