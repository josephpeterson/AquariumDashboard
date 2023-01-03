import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeciesContainer } from './modules/SpeciesModule/SpeciesContainer/species-container.component';
import { AuthGuard } from './guards/AuthGuard';
import { HomeComponent } from './modules/CoreModule/containers/home/home/home.component';
import { LoginComponent } from './modules/CoreModule/containers/home/login/login.component';
import { PasswordResetComponent } from './modules/CoreModule/containers/home/passwordreset/password-reset.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'passwordreset/:resetToken',
    component: PasswordResetComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },



  //Species Modules
  {
    path: 'species',
    loadChildren: () => import('./modules/SpeciesModule/species.module').then(m => m.SpeciesModule),
  },
  //Overview Module
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/OverviewModule/overview.module').then(m => m.OverviewModule),
  },
  //Settings Module
  {
    path: 'settings',
    loadChildren: () => import('./modules/SettingsModule/settings.module').then(m => m.SettingsModule),
  },
  //Fish Module
  {
    path: 'fish',
    loadChildren: () => import('./modules/FishModule/fish.module').then(m => m.FishModule),
  },
  //Profile Module
  {
    path: 'p',
    loadChildren: () => import('./modules/ProfileModule/profile.module').then(m => m.ProfileModule),
  },
  //Discussion Module
  {
    path: 'discussion',
    loadChildren: () => import('./modules/DiscussionModule/discussion.module').then(m => m.DiscussionModule),
  },
  //Aquarium Module
  {
    path: 'aquarium',
    loadChildren: () => import('./modules/AquariumModule/aquarium.module').then(m => m.AquariumModule),
  },
  //Calendar Module
  {
    path: 'calendar',
    loadChildren: () => import('./modules/CalendarModule/calendar.module').then(m => m.CalendarModule),
  },
  //Misc.
  //{ path: '**', component: PageNotFoundComponent } /* Needs to be last */
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }

