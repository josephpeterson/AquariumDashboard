//this is modelled from your app.module.ts and the components and 
//services are just arbitrary examples, your module might be different
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { AquariumService } from '../../services/aquarium.service';
import { FishService } from '../../services/fish.service';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
import { AuthGuard } from '../../guards/AuthGuard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AquariumInterceptor } from '../../services/aquarium.interceptor';
import { SharedModule } from '../SharedModule/shared.module';
import { SettingsContainer } from './SettingsContainer/settings-container.component';
import { SettingsNavBarComponent } from './SettingsContainer/nav-bar/settings-nav-bar.component';
import { SettingsUsersComponent } from './SettingsContainer/admin/users/settings-users.component';
import { SettingsLogsComponent } from './SettingsContainer/admin/logs/settings-logs.component';
import { SettingsBugsComponent } from './SettingsContainer/admin/bugs/settings-bugs.component';
import { SettingsGeneralComponent } from './SettingsContainer/general/settings-general.component';
import { SettingsPrivacyComponent } from './SettingsContainer/privacy/settings-privacy.component';
import { SettingsSecurityComponent } from './SettingsContainer/security/settings-security.component';
import { SettingsProfileComponent } from './SettingsContainer/profile/settings-profile.component';
import { SettingsNotificationsComponent } from './SettingsContainer/admin/notifications/settings-notifications.component';
import { UsersTableComponent } from './SettingsContainer/admin/users/users-table/users-table.component';
import { NotificationsTableComponent } from './SettingsContainer/admin/notifications/notifications-table/notifications-table.component';
import { BugsTableComponent } from './SettingsContainer/admin/bugs/bugs-table/bugs-table.component';
import { RouterModule } from '@angular/router';
import { SettingsRoutes } from './settings-routing.module';
import { MatProgressSpinnerModule, MatTableModule, MatCheckboxModule, MatPaginatorModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    SettingsRoutes,

    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
  ],
  declarations: [
    SettingsContainer,
    SettingsNavBarComponent,
    SettingsUsersComponent,
    SettingsLogsComponent,
    SettingsBugsComponent,
    SettingsGeneralComponent,
    SettingsPrivacyComponent,
    SettingsSecurityComponent,
    SettingsProfileComponent,
    SettingsNotificationsComponent,

    UsersTableComponent,
    NotificationsTableComponent,
    BugsTableComponent,
  ],
  providers: [
    AquariumService,
    FishService,
    AuthService,
    AdminService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AquariumInterceptor, multi: true },
  ],
})
export class SettingsModule {}