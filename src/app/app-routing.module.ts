import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterDashboardComponent } from './components/containers/DashboardContainer/master-dashboard.component';
import { FishComponent as AquariumFishComponent } from './components/containers/AquariumContainer/fish/fish.component';
import { LightingComponent } from './components/containers/AquariumContainer/lighting/lighting.component';
import { SettingsComponent } from './components/containers/AquariumContainer/settings/settings.component';
import { DashboardComponent } from './components/containers/AquariumContainer/dashboard/dashboard.component';
import { AquariumContainer } from './components/containers/AquariumContainer/aquarium-container.component';
import { MaintenanceComponent } from './components/containers/AquariumContainer/maintenance/maintenance.component';
import { AquariumParametersComponent } from './components/containers/AquariumContainer/parameters/aquarium-parameters.component';
import { AquariumPhotosComponent } from './components/containers/AquariumContainer/photos/aquarium-photos.component';
import { SpeciesContainer } from './components/containers/SpeciesContainer/species-container.component';
import { AuthGuard } from './guards/AuthGuard';
import { LoginComponent } from './components/routes/login/login.component';
import { SignupComponent } from './components/routes/signup/signup.component';
import { HomeComponent } from './components/routes/home/home.component';

const routes: Routes = [
  //{ path: '', component: AquariumSelectionComponent, pathMatch: 'full' },

  {
    path: 'species',
    component: SpeciesContainer
  },
  {
    path: 'species/:speciesId',
    component: SpeciesContainer
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: MasterDashboardComponent
  },
  {
    path: ':aqId',
    component: AquariumContainer,
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'fish',
        component: AquariumFishComponent
      },
      {
        path: 'parameters',
        component: AquariumParametersComponent
      },
      {
        path: 'photos',
        component: AquariumPhotosComponent
      },
      {
        path: 'fish/:fishId',
        component: AquariumFishComponent
      },
      {
        path: 'lighting',
        component: LightingComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'maintenance/:tabId',
        component: MaintenanceComponent
      },
      {
        path: 'maintenance',
        component: MaintenanceComponent
      },
      {
        path: '',
        component: DashboardComponent
      }
    ]
  },
  {
    path: '',
    component: HomeComponent
  },
  { path: '**', redirectTo: "/" }
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })]
})
export class AppRoutingModule { }

