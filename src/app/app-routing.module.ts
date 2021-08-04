import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeciesContainer } from './modules/SpeciesModule/SpeciesContainer/species-container.component';
import { AuthGuard } from './guards/AuthGuard';
import { HomeComponent } from './components/home/home.component';
import { PasswordResetComponent } from './components/passwordreset/password-reset.component';
import { PageNotFoundComponent } from './modules/SharedModule/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';

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
    loadChildren: () => import('./modules/SpeciesModule/species.module').then(m => m.SpeciesModule),
  },
  //Master Dashboard
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/OverviewModule/overview.module').then(m => m.OverviewModule),
  },


  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'settings',
    loadChildren: () => import('./modules/SettingsModule/settings.module').then(m => m.SettingsModule),
  },
  {
    path: 'fish',
    loadChildren: () => import('./modules/FishModule/fish.module').then(m => m.FishModule),
  },
  {
    path: 'p',
    loadChildren: () => import('./modules/ProfileModule/profile.module').then(m => m.ProfileModule),
  },

  {
    path: 'discussion',
    loadChildren: () => import('./modules/DiscussionModule/discussion.module').then(m => m.DiscussionModule),
  },
  {
    path: 'aquarium',
    loadChildren: () => import('./modules/AquariumModule/aquarium.module').then(m => m.AquariumModule),
  },
  {
    path: 'calendar',
    loadChildren: () => import('./modules/CalendarModule/calendar.module').then(m => m.CalendarModule),
  },
  { path: '**', component: PageNotFoundComponent } /* Needs to be last */
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })]
})
export class AppRoutingModule { }

