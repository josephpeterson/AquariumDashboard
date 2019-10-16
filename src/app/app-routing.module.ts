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
import { FishContainer } from './components/containers/FishContainer/fish-container.component';
import { FishDetailViewComponent } from './components/containers/FishContainer/fish-detail-view/fish-detail-view.component';
import { FishEditViewComponent } from './components/containers/FishContainer/fish-edit-view/fish-edit-view.component';
import { SettingsContainer } from './components/containers/SettingsContainer/settings-container.component';
import { SettingsGeneralComponent } from './components/containers/SettingsContainer/general/settings-general.component';
import { SettingsLogsComponent } from './components/containers/SettingsContainer/admin/logs/settings-logs.component';
import { SettingsUsersComponent } from './components/containers/SettingsContainer/admin/users/settings-users.component';
import { SettingsSecurityComponent } from './components/containers/SettingsContainer/security/settings-security.component';
import { SettingsPrivacyComponent } from './components/containers/SettingsContainer/privacy/settings-privacy.component';
import { SettingsProfileComponent } from './components/containers/SettingsContainer/profile/settings-profile.component';
import { SettingsBugsComponent } from './components/containers/SettingsContainer/admin/bugs/settings-bugs.component';
import { ProfileContainer } from './components/containers/ProfileContainer/profile-container.component';
import { ProfileFishComponent } from './components/containers/ProfileContainer/pages/profile-fish/profile-fish.component';
import { ProfileAboutComponent } from './components/containers/ProfileContainer/pages/profile-about/profile-about.component';
import { ProfilePhotosComponent } from './components/containers/ProfileContainer/pages/profile-photos/profile-photos.component';
import { ProfileAquariumsComponent } from './components/containers/ProfileContainer/pages/profile-aquariums/profile-aquariums.component';
import { ProfileManageComponent } from './components/containers/ProfileContainer/pages/profile-manage/profile-manage.component';
import { ProfileOverviewComponent } from './components/containers/ProfileContainer/pages/profile-overview/profile-overview.component';
import { DiscussionContainerComponent } from './components/containers/DiscussionContainer/discussion-container.component';
import { MainPageComponent } from './components/containers/DiscussionContainer/main-page/main-page.component';
import { BoardPageComponent } from './components/containers/DiscussionContainer/board-page/board-page.component';
import { ThreadPageComponent } from './components/containers/DiscussionContainer/thread-page/thread-page.component';
import { CreateThreadFormComponent } from './components/containers/DiscussionContainer/board-page/create-thread-form/create-thread-form.component';
import { BoardDetailComponent } from './components/containers/DiscussionContainer/board-page/board-detail/board-detail.component';

const routes: Routes = [
  //{ path: '', component: AquariumSelectionComponent, pathMatch: 'full' },

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
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: MasterDashboardComponent
  },
  {
    path: 'settings',
    component: SettingsContainer,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'privacy',
        component: SettingsPrivacyComponent
      },
      {
        path: 'security',
        component: SettingsSecurityComponent
      },
      {
        path: 'profile',
        component: SettingsProfileComponent
      },

      //Admin stuff
      {
        path: 'logs',
        component: SettingsLogsComponent
      },
      {
        path: 'users',
        component: SettingsUsersComponent
      },
      {
        path: 'bugs',
        component: SettingsBugsComponent
      },
      {
        path: '**',
        component: SettingsGeneralComponent
      },
    ]
  },
  {
    path: 'aquarium/:aqId',
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
    path: 'fish/:fishId',
    component: FishContainer,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'feeding',
        component: FishDetailViewComponent
      },
      {
        path: 'photos',
        component: FishDetailViewComponent
      },
      {
        path: 'edit',
        component: FishEditViewComponent
      },
      {
        path: '',
        component: FishDetailViewComponent
      }
    ]
  },

  {
    path: 'p/:profileId',
    component: ProfileContainer,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'aquariums',
        component: ProfileAquariumsComponent
      },
      {
        path: 'fish',
        component: ProfileFishComponent
      },
      {
        path: 'about',
        component: ProfileAboutComponent
      },
      {
        path: 'photos',
        component: ProfilePhotosComponent
      },
      {
        path: 'manage',
        component: ProfileManageComponent
      },
      {
        path: '',
        component: ProfileOverviewComponent
      }
    ]
  },

  {
    path: 'discussion',
    component: DiscussionContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'board/:boardId',
        component: BoardPageComponent,
        children: [
          {
            path: 'new',
            component: CreateThreadFormComponent
          },
          {
            path: '**',
            component: BoardDetailComponent
          }]
      },
      {
        path: 'thread/:threadId',
        component: ThreadPageComponent
      },
      {
        path: '',
        component: MainPageComponent
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

