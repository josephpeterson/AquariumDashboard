import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AquariumSelectionComponent } from './components/aquarium-selection/aquarium-selection.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { FishComponent } from './components/fish/fish.component';
import { LightingComponent } from './components/lighting/lighting.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: AquariumSelectionComponent, pathMatch: 'full' },
  {
    path: ':aqId', component: NavMenuComponent, children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'maintenance/:tab',
        component: MaintenanceComponent
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
        path: '',
        component: DashboardComponent
      }
    ]
  },
  { path: ':aqId/fish', component: FishComponent, pathMatch: 'full' },
  { path: ':aqId/lighting', component: LightingComponent, pathMatch: 'full' },
  { path: ':aqId/settings', component: SettingsComponent, pathMatch: 'full' },
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }

