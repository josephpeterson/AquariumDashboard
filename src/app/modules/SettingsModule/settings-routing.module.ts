import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/AuthGuard';
import { SettingsContainer } from './SettingsContainer/settings-container.component';
import { SettingsPrivacyComponent } from './SettingsContainer/privacy/settings-privacy.component';
import { SettingsSecurityComponent } from './SettingsContainer/security/settings-security.component';
import { SettingsProfileComponent } from './SettingsContainer/profile/settings-profile.component';
import { SettingsLogsComponent } from './SettingsContainer/admin/logs/settings-logs.component';
import { SettingsUsersComponent } from './SettingsContainer/admin/users/settings-users.component';
import { SettingsNotificationsComponent } from './SettingsContainer/admin/notifications/settings-notifications.component';
import { SettingsBugsComponent } from './SettingsContainer/admin/bugs/settings-bugs.component';
import { SettingsGeneralComponent } from './SettingsContainer/general/settings-general.component';
import { SettingsModule } from './settings.module';

const secondaryRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: SettingsContainer,
        children: [
            {
                path: 'privacy',
                component: SettingsPrivacyComponent
            },
            {
                path: 'security',
                component: SettingsSecurityComponent
            },
            {
                path: 'profile',
                component: SettingsProfileComponent
            },

            //Admin stuff
            {
                path: 'logs',
                component: SettingsLogsComponent
            },
            {
                path: 'users',
                component: SettingsUsersComponent
            },
            {
                path: 'notifications',
                component: SettingsNotificationsComponent
            },
            {
                path: 'bugs',
                component: SettingsBugsComponent
            },
            {
                path: '**',
                component: SettingsGeneralComponent
            },
        ]
    },
];

//taken from angular.io
//Only call RouterModule.forRoot in the root AppRoutingModule (or the AppModule if 
//that's where you register top level application routes). In any other module, you 
//must call the RouterModule.forChild method to register additional routes.

export const SettingsRoutes: ModuleWithProviders<SettingsModule> = RouterModule.forChild(secondaryRoutes)