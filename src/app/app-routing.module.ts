import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AquariumSelectionComponent } from './components/containers/aquarium-selection/aquarium-selection.component';
import { MaintenanceComponent } from './components/containers/maintenance/maintenance.component';
import { FishComponent } from './components/containers/fish/fish.component';
import { LightingComponent } from './components/containers/lighting/lighting.component';
import { SettingsComponent } from './components/containers/settings/settings.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { DashboardComponent } from './components/containers/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: AquariumSelectionComponent, pathMatch: 'full' },
  {
    path: ':aqId', component: NavMenuComponent, children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'fish',
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
  }
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }

