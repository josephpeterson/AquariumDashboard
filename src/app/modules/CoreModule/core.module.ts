//this is modelled from your app.module.ts and the components and 
//services are just arbitrary examples, your module might be different
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { ForgotPasswordModalComponent } from './components/forgot-password-modal/forgot-password-modal.component';
import { AquariumDeviceHttpClient } from './aquarium-device-client.service';
import { SharedDeviceModule } from '../SharedDeviceModule/shared-device.module';
import { SharedModule } from '../SharedModule/shared.module';
import { AquariumMonitorNavBarComponent } from './components/aquarium-monitor-nav-bar/aquarium-monitor-nav-bar.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { AquariumMonitorSideBarComponent } from './components/aquarium-monitor-side-bar/aquarium-monitor-side-bar.component';
import { AquariumMonitorNavBarNotificationsComponent } from './components/aquarium-monitor-nav-bar-notifications/aquarium-monitor-nav-bar-notifications.component';
import { AquariumMonitorSideBarAquariumSectionComponent } from './components/aquarium-monitor-side-bar-aquarium-section/aquarium-monitor-side-bar-aquarium-selection.component';
import { HomeComponent } from './containers/home/home/home.component';
import { HomeNavComponent } from './containers/home/home/home-nav/home-nav.component';
import { LoginComponent } from './containers/home/login/login.component';
import { PasswordResetComponent } from './containers/home/passwordreset/password-reset.component';
import { SignupComponent } from './containers/home/signup/signup.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    SharedDeviceModule //this only needs to be here because aquarium-service uses aquarium-device-service
  ],
  declarations: [

    AquariumMonitorNavBarComponent,
    AquariumMonitorNavBarNotificationsComponent,
    AquariumMonitorSideBarComponent,
    AquariumMonitorSideBarAquariumSectionComponent,
    
    SearchFormComponent,

    /* Not logged in */
    HomeComponent,
    HomeNavComponent,
    LoginComponent,
    SignupComponent,
    PasswordResetComponent,
    LoginModalComponent,
    ForgotPasswordModalComponent,
  ],
  exports: [
    HomeComponent,
    LoginComponent,
    PasswordResetComponent,
    
    AquariumMonitorNavBarComponent,
    AquariumMonitorSideBarComponent
  ],
  entryComponents: [
    LoginModalComponent,
    ForgotPasswordModalComponent
  ],
  providers: [
    AuthService,
  ],
})
export class CoreModule { }