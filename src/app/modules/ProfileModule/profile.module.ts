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
import { ProfileContainer } from './ProfileContainer/profile-container.component';
import { ProfilePictureThumbnailComponent } from './profile-picture-thumbnail/profile-picture-thumbnail.component';
import { ProfileBannerComponent } from './profile-banner/profile-banner.component';
import { StarButtonComponent } from './star-button/star-button.component';
import { AquariumSectionComponent } from './aquarium-section/aquarium-section.component';
import { FishSectionComponent } from './fish-section/fish-section.component';
import { GeneralSectionComponent } from './general-section/general-section.component';
import { ProfileActivityPostComponent } from './posts/profile-activity-post/profile-activity-post.component';
import { CreateAquariumPostComponent } from './posts/create-aquarium/create-aquarium-post.component';
import { AquariumTestResultsPostComponent } from './posts/aquarium-test-results/aquarium-test-results-post.component';
import { PhotoSectionComponent } from './photo-section/photo-section.component';
import { SectionBannerComponent } from './section-banner/section-banner.component';
import { ProfileAboutComponent } from './pages/profile-about/profile-about.component';
import { ProfileAquariumsComponent } from './pages/profile-aquariums/profile-aquariums.component';
import { ProfileFishComponent } from './pages/profile-fish/profile-fish.component';
import { ProfilePhotosComponent } from './pages/profile-photos/profile-photos.component';
import { ProfileManageComponent } from './pages/profile-manage/profile-manage.component';
import { ProfileOverviewComponent } from './pages/profile-overview/profile-overview.component';
import { ProfileProgressionComponent } from './profile-progression/profile-progression.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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