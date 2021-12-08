//this is modelled from your app.module.ts and the components and 
//services are just arbitrary examples, your module might be different
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AquariumService } from '../../services/aquarium.service';
import { AuthService } from 'src/app/services/auth.service';
import { HomeNavComponent } from './components/home/home/home-nav/home-nav.component';
import { HomeComponent } from './components/home/home/home.component';
import { SignupComponent } from './components/home/signup/signup.component';
import { LoginComponent } from './components/home/login/login.component';
import { PasswordResetComponent } from './components/home/passwordreset/password-reset.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { ForgotPasswordModalComponent } from './components/forgot-password-modal/forgot-password-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  declarations: [
    /* Not logged in */
    HomeComponent,
    HomeNavComponent,
    LoginComponent,
    SignupComponent,
    PasswordResetComponent,
    LoginModalComponent,
    ForgotPasswordModalComponent,
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