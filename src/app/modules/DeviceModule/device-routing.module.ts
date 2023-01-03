import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/guards/AuthGuard';
import { DeviceModule } from './device.module';
import { DeviceOverviewComponent } from './overview/device-overview.component';
import { DeviceSettingsComponent } from './settings/device-settings.component';
import { DeviceScheduleComponent } from './schedule/device-schedule.component';
import { AquariumDeviceComponent } from './aquarium-device.component';
import { DeviceSensorsComponent } from './sensors/sensors.component';
import { DeviceMixingStationContainerComponent } from './mixing-station/mixing-station.component';

const secondaryRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: AquariumDeviceComponent,
        children: [
            {
                path: 'overview',
                component: DeviceOverviewComponent
            },
            {
                path: 'settings',
                component: DeviceSettingsComponent
            },
            {
                path: 'schedule',
                component: DeviceScheduleComponent
            },
            {
                path: 'sensors',
                component: DeviceSensorsComponent
            },
            {
                path: 'mixingstation',
                component: DeviceMixingStationContainerComponent
            },
            {
                path: '',
                redirectTo: 'overview'
            },
        ]
    },
];

//taken from angular.io
//Only call RouterModule.forRoot in the root AppRoutingModule (or the AppModule if 
//that's where you register top level application routes). In any other module, you 
//must call the RouterModule.forChild method to register additional routes.

export const DeviceRoutes: ModuleWithProviders<DeviceModule> = RouterModule.forChild(secondaryRoutes)