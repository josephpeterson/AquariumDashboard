import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../guards/AuthGuard';
import { ProfileContainer } from '../../components/containers/ProfileContainer/profile-container.component';
import { ProfileAquariumsComponent } from '../../components/containers/ProfileContainer/pages/profile-aquariums/profile-aquariums.component';
import { ProfileFishComponent } from '../../components/containers/ProfileContainer/pages/profile-fish/profile-fish.component';
import { ProfileAboutComponent } from '../../components/containers/ProfileContainer/pages/profile-about/profile-about.component';
import { ProfilePhotosComponent } from '../../components/containers/ProfileContainer/pages/profile-photos/profile-photos.component';
import { ProfileManageComponent } from '../../components/containers/ProfileContainer/pages/profile-manage/profile-manage.component';
import { ProfileOverviewComponent } from '../../components/containers/ProfileContainer/pages/profile-overview/profile-overview.component';

const secondaryRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: ProfileContainer
    },
    {
        path: ':profileId',
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
];

//taken from angular.io
//Only call RouterModule.forRoot in the root AppRoutingModule (or the AppModule if 
//that's where you register top level application routes). In any other module, you 
//must call the RouterModule.forChild method to register additional routes.

export const ProfileRoutes: ModuleWithProviders = RouterModule.forChild(secondaryRoutes)