import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterDashboardComponent } from './components/master-dashboard/master-dashboard.component';
import { MaintenanceComponent } from './components/containers/maintenance/maintenance.component';
import { FishComponent } from './components/containers/AquariumContainer/fish/fish.component';
import { LightingComponent } from './components/containers/AquariumContainer/lighting/lighting.component';
import { SettingsComponent } from './components/containers/AquariumContainer/settings/settings.component';
import { DashboardComponent } from './components/containers/AquariumContainer/dashboard/dashboard.component';
import { SpeciesComponent } from './components/containers/species/species.component';
import { AquariumContainer } from './components/containers/AquariumContainer/aquarium-container.component';

const routes: Routes = [
  //{ path: '', component: AquariumSelectionComponent, pathMatch: 'full' },
  {
    path: 'species',
    component: SpeciesComponent
  },
  {
    path: 'species/:speciesId',
    component: SpeciesComponent
  },
  {
    path: ':aqId', component: AquariumContainer, children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'fish',
        component: FishComponent
      },
      {
        path: 'fish/:fishId',
        component: FishComponent
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
    component: MasterDashboardComponent
  },
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }

