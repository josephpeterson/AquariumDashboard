//this is modelled from your app.module.ts and the components and 
//services are just arbitrary examples, your module might be different
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { AquariumService } from '../../services/aquarium.service';
import { FishService } from '../../services/fish.service';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
import { AuthGuard } from '../../guards/AuthGuard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AquariumInterceptor } from '../../services/aquarium.interceptor';
import { SharedModule } from '../SharedModule/shared.module';
import { ProfileContainer } from '../../components/containers/ProfileContainer/profile-container.component';
import { ProfilePictureThumbnailComponent } from '../../components/containers/ProfileContainer/profile-picture-thumbnail/profile-picture-thumbnail.component';
import { ProfileBannerComponent } from '../../components/containers/ProfileContainer/profile-banner/profile-banner.component';
import { StarButtonComponent } from '../../components/containers/ProfileContainer/star-button/star-button.component';
import { AquariumSectionComponent } from '../../components/containers/ProfileContainer/aquarium-section/aquarium-section.component';
import { FishSectionComponent } from '../../components/containers/ProfileContainer/fish-section/fish-section.component';
import { GeneralSectionComponent } from '../../components/containers/ProfileContainer/general-section/general-section.component';
import { ProfileActivityPostComponent } from '../../components/containers/ProfileContainer/posts/profile-activity-post/profile-activity-post.component';
import { CreateAquariumPostComponent } from '../../components/containers/ProfileContainer/posts/create-aquarium/create-aquarium-post.component';
import { AquariumTestResultsPostComponent } from '../../components/containers/ProfileContainer/posts/aquarium-test-results/aquarium-test-results-post.component';
import { PhotoSectionComponent } from '../../components/containers/ProfileContainer/photo-section/photo-section.component';
import { SectionBannerComponent } from '../../components/containers/ProfileContainer/section-banner/section-banner.component';
import { ProfileAboutComponent } from '../../components/containers/ProfileContainer/pages/profile-about/profile-about.component';
import { ProfileAquariumsComponent } from '../../components/containers/ProfileContainer/pages/profile-aquariums/profile-aquariums.component';
import { ProfileFishComponent } from '../../components/containers/ProfileContainer/pages/profile-fish/profile-fish.component';
import { ProfilePhotosComponent } from '../../components/containers/ProfileContainer/pages/profile-photos/profile-photos.component';
import { ProfileManageComponent } from '../../components/containers/ProfileContainer/pages/profile-manage/profile-manage.component';
import { ProfileOverviewComponent } from '../../components/containers/ProfileContainer/pages/profile-overview/profile-overview.component';
import { ProfileProgressionComponent } from '../../components/containers/AquariumContainer/dashboard/profile-progression/profile-progression.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule, MatProgressSpinnerModule, MatCardModule, MatTableModule, MatTabsModule, MatCheckboxModule, MatInputModule, MatRadioModule, MatSortModule, MatMenuModule, MatIconModule, MatListModule, MatToolbarModule, MatFormFieldModule, MatPaginatorModule, MatSelectModule, MatDialogModule, MatSliderModule, MatButtonModule, MatDatepickerModule, MatAutocompleteModule, MatNativeDateModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { Ng5SliderModule } from 'ng5-slider';
import { ColorPickerModule } from 'ngx-color-picker';
import { ProfileRoutes } from './profile-routing.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ColorPickerModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutes, //<-- import

    MatSidenavModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    MatInputModule,
    MatRadioModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatSliderModule,
    MatButtonModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatFileUploadModule,
    Ng5SliderModule,
  ],
  declarations: [
    ProfileContainer,
    ProfilePictureThumbnailComponent,
    ProfileBannerComponent,
    StarButtonComponent,
    AquariumSectionComponent,
    FishSectionComponent,
    GeneralSectionComponent,
    ProfileActivityPostComponent,
    CreateAquariumPostComponent,
    AquariumTestResultsPostComponent,
    PhotoSectionComponent,
    SectionBannerComponent,
    ProfileAboutComponent,
    ProfileAquariumsComponent,
    ProfileFishComponent,
    ProfilePhotosComponent,
    ProfileManageComponent,
    ProfileOverviewComponent,
    ProfileProgressionComponent,
  ],
  providers: [
    AquariumService,
    FishService,
    AuthService,
    AdminService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AquariumInterceptor, multi: true },
  ],
})
export class ProfileModule {}