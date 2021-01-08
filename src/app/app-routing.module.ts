import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeciesContainer } from './components/containers/SpeciesContainer/species-container.component';
import { AuthGuard } from './guards/AuthGuard';
import { HomeComponent } from './components/routes/home/home.component';
import { PasswordResetComponent } from './components/routes/passwordreset/password-reset.component';
import { PageNotFoundComponent } from './modules/SharedModule/page-not-found/page-not-found.component';
import { LoginComponent } from './components/routes/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'passwordreset/:resetToken',
    component: PasswordResetComponent
  },

  //Species
  {
    path: 'species',
    canActivate: [AuthGuard],
    component: SpeciesContainer
  },
  {
    path: 'species/:speciesId',
    canActivate: [AuthGuard],
    component: SpeciesContainer
  },
  //Master Dashboard
  {
    path: 'dashboard',
    loadChildren: './modules/OverviewModule/overview.module#OverviewModule',
  },


  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'settings',
    loadChildren: './modules/SettingsModule/settings.module#SettingsModule',
  },
  {
    path: 'fish',
    loadChildren: './modules/FishModule/fish.module#FishModule',
  },
  {
    path: 'p',
    loadChildren: './modules/ProfileModule/profile.module#ProfileModule',
  },

  {
    path: 'discussion',
    loadChildren: './modules/DiscussionModule/discussion.module#DiscussionModule',
  },
  {
    path: 'aquarium',
    loadChildren: './modules/AquariumModule/aquarium.module#AquariumModule',
  },
  { path: '**', component: PageNotFoundComponent } /* Needs to be last */
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })]
})
export class AppRoutingModule { }

