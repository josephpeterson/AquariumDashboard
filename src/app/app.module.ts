import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule, MatInputModule, MatSelectModule, MatDialogModule, MatButtonModule, MatNativeDateModule, MatAutocompleteModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';

import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material';

import { MatListModule } from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


//Component declarations
import { AppComponent } from './components/app-root/app.component';
import { NavMenuComponent } from './components/shared/nav-menu/nav-menu.component';
import { DashboardComponent } from './components/containers/AquariumContainer/dashboard/dashboard.component';


//Misc.
import { FishComponent } from './components/containers/AquariumContainer/fish/fish.component';
import { MaintenanceComponent } from './components/containers/AquariumContainer/maintenance/maintenance.component';
import { SettingsComponent } from './components/containers/AquariumContainer/settings/settings.component';
import { TaskListComponent } from './components/shared/task-list/task-list.component';
import { TaskTableComponent } from './components/shared/task-table/task-table.component';
import { LightingComponent } from './components/containers/AquariumContainer/lighting/lighting.component';


//Color picker
import { ColorPickerModule } from 'ngx-color-picker';

//ngRx Store support
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AquariumEffects } from './store/aquarium/aquarium.effect';
import { SnapshotEffects } from './store/snapshot/snapshot.effect';
import { SpeciesEffects } from './store/species/species.effect';
import { aquariumReducer } from './store/aquarium/aquarium.reducer';
import { snapshotReducer } from './store/snapshot/snapshot.reducer';
import { speciesReducer } from './store/species/species.reducer';

import { MasterDashboardComponent } from './components/containers/DashboardContainer/master-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorMessageModalComponent } from './components/shared/modals/error-message-modal/error-message-modal.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { CreateAquariumModelComponent } from './components/shared/modals/create-aquarium-modal/create-aquarium-modal.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { ConfirmModalComponent } from './components/shared/modals/confirm-modal/confirm-modal.component';
import { NotifierModule } from 'angular-notifier';
import { AquariumNotifierConfig } from './config/notifier';
import { ParameterTabComponent } from './components/containers/AquariumContainer/maintenance/parameters-tab/maintenance-parameters-tab.component';
import { NotificationsListComponent } from './components/containers/AquariumContainer/maintenance/notifications-list/notifications-list.component';
import { TaskTabComponent } from './components/containers/AquariumContainer/maintenance/task-tab/task-list.component';
import { SnapshotCarouselComponent } from './components/data/snapshot/carousel/snapshot-carousel.component';
import { SnapshotTakeButtonComponent } from './components/data/snapshot/take-button/snapshot-take-button.component';
import { SnapshotDeleteButtonComponent } from './components/data/snapshot/delete-button/snapshot-delete-button.component';
import { FishTableListComponent } from './components/data/fish/table-list/fish-table-list.component';
import { SpeciesSelectComponent } from './components/data/species/select/species-select.component';
import { AquariumSelectComponent } from './components/data/aquarium/select/aquarium-select.component';
import { ManageSpeciesModalComponent } from './components/shared/modals/manage-species-modal/manage-species-modal.component';
import { SpeciesTableComponent } from './components/data/species/species-table/species-table.component';
import { SpeciesDetailFormComponent } from './components/data/species/species-detail-form/species-detail-form.component';
import { FishInformationComponent } from './components/data/fish/fish-information/fish-information.component';
import { FishSelectComponent } from './components/data/fish/select/fish-select.component';
import { FishAddModalComponent } from './components/shared/modals/fish-add-modal/fish-add-modal.component';
import { FeedingTableListComponent } from './components/data/feeding/feeding-table/feeding-table-list.component';
import { FeedingListComponent } from './components/containers/AquariumContainer/maintenance/feeding-list/feeding-list.component';
import { FeedingDetailFormComponent } from './components/data/feeding/feeding-detail-form/feeding-detail-form.component';
import { AquariumContainer } from './components/containers/AquariumContainer/aquarium-container.component';
import { SpeciesDetailViewComponent } from './components/data/species/species-detail-view/species-detail-view.component';
import { ScraperModalComponent } from './components/shared/modals/scraper-modal/scraper-modal.component';
import { AquariumTableComponent } from './components/data/aquarium/aquarium-table/aquarium-table.component';
import { SelectAquariumModalComponent } from './components/shared/modals/select-aquarium-modal/select-aquarium-modal.component';
import { FishDetailViewComponent } from './components/containers/FishContainer/fish-detail-view/fish-detail-view.component';
import { FishEffects } from './store/fish/fish.effect';
import { fishReducer } from './store/fish/fish.reducer';
import { DeviceDetailFormComponent } from './components/data/device/device-detail-form/device-detail-form.component';
import { ManageAquariumDeviceModalComponent } from './components/shared/modals/manage-aquarium-device-modal/manage-aquarium-device-modal.component';
import { PhotoExpandedModalComponent } from './components/shared/modals/photo-expanded-modal/photo-expanded-modal.component';
import { FishCreateButtonComponent } from './components/data/fish/create-button/fish-create-button.component';
import { SnapshotTableListComponent } from './components/data/snapshot/table-list/snapshot-table-list.component';
import { SnapshotPhotoConfigDetail } from './components/containers/AquariumContainer/settings/photo-config-detail/snapshot-photo-config-detail.component';
import { ManagePhotoConfigurationModal } from './components/shared/modals/manage-photo-configuration/manage-photo-configuration.component';
import { ManageSnapshotModal } from './components/shared/modals/manage-snapshot-modal/manage-snapshot-modal.component';
import { SnapshotDetailComponent } from './components/data/snapshot/snapshot-detail-form/snapshot-detail-form.component';
import { AttachmentUploaderComponent } from './components/shared/attachment-uploader/attachment-uploader.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { SnapshotDetailChartComponent } from './components/data/snapshot/snapshot-detail-chart/snapshot-detail-chart.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FishCardComponent } from './components/data/fish/fish-card/fish-card.component';
import { AquariumParametersComponent } from './components/containers/AquariumContainer/parameters/aquarium-parameters.component';
import { AquariumPhotosComponent } from './components/containers/AquariumContainer/photos/aquarium-photos.component';
import { SpeciesContainer } from './components/containers/SpeciesContainer/species-container.component';
import { AquariumInterceptor } from './services/aquarium.interceptor';
import { LoginModalComponent } from './components/shared/modals/login-modal/login-modal.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AquariumService } from './services/aquarium.service';
import { AuthGuard } from './guards/AuthGuard';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/routes/login/login.component';
import { SignupComponent } from './components/routes/signup/signup.component';
import { HomeComponent } from './components/routes/home/home.component';
import { DeviceDetailViewComponent } from './components/data/device/device-detail-view/device-detail-view.component';
import { BugReportModalComponent } from './components/shared/modals/bugreport-modal/bugreport-modal.component';
import { BugReportButtonComponent } from './components/shared/bugreport-button/bugreport-button.component';
import { SpeciesCardComponent } from './components/data/species/species-card/species-card.component';
import { FishFeedModalComponent } from './components/shared/modals/fish-feed-modal/fish-feed-modal.component';
import { FishAddFormComponent } from './components/data/fish/fish-add-form/fish-add-form.component';
import { FishContainer } from './components/containers/FishContainer/fish-container.component';
import { LoadingContainerComponent } from './components/shared/loading-container/loading-container.component';
import { FishPhotoModal } from './components/shared/modals/fish-photo-modal/fish-photo-modal.component';
import { FishPhotoSelectComponent } from './components/data/fish/photo-select/fish-photo-select.component';
import { FishPhotoSelectModal } from './components/shared/modals/fish-photo-select-modal/fish-photo-select-modal.component';
import { FishEditViewComponent } from './components/containers/FishContainer/fish-edit-view/fish-edit-view.component';
import { FishAddPhotoButtonComponent } from './components/data/fish/add-photo-button/fish-add-photo-button.component';
import { SettingsContainer } from './components/containers/SettingsContainer/settings-container.component';
import { SettingsNavBarComponent } from './components/containers/SettingsContainer/nav-bar/settings-nav-bar.component';
import { SettingsLogsComponent } from './components/containers/SettingsContainer/admin/logs/settings-logs.component';
import { SettingsGeneralComponent } from './components/containers/SettingsContainer/general/settings-general.component';
import { SettingsUsersComponent } from './components/containers/SettingsContainer/admin/users/settings-users.component';
import { SettingsPrivacyComponent } from './components/containers/SettingsContainer/privacy/settings-privacy.component';
import { SettingsSecurityComponent } from './components/containers/SettingsContainer/security/settings-security.component';
import { SettingsProfileComponent } from './components/containers/SettingsContainer/profile/settings-profile.component';
import { AdminService } from './services/admin.service';
import { UsersTableComponent } from './components/containers/SettingsContainer/admin/users/users-table/users-table.component';
import { BugsTableComponent } from './components/containers/SettingsContainer/admin/bugs/bugs-table/bugs-table.component';
import { SettingsBugsComponent } from './components/containers/SettingsContainer/admin/bugs/settings-bugs.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FeedingListComponent,
    SpeciesContainer,
    FishContainer,
    
    HomeComponent,
    LoginComponent,
    SignupComponent,
    
    
    SettingsContainer,
    SettingsNavBarComponent,
    SettingsUsersComponent,
    SettingsLogsComponent,
    SettingsBugsComponent,
    SettingsGeneralComponent,
    SettingsPrivacyComponent,
    SettingsSecurityComponent,
    SettingsProfileComponent,

    /* Admin components */
    UsersTableComponent,
    BugsTableComponent,


    /* Misc. */
    AttachmentUploaderComponent,
    BugReportButtonComponent,
    LoadingContainerComponent,

    /* Aquarium Container */
    AquariumContainer,
    DashboardComponent,
    FishComponent,
    LightingComponent,
    AquariumParametersComponent,
    AquariumPhotosComponent,

    MaintenanceComponent,
    ParameterTabComponent,

    /* Data sources */

    SnapshotCarouselComponent,
    SnapshotTakeButtonComponent,
    SnapshotDeleteButtonComponent,
    SnapshotTableListComponent,
    SnapshotPhotoConfigDetail,
    SnapshotDetailComponent,
    SnapshotDetailChartComponent,


    FishTableListComponent,
    FishAddFormComponent,
    FishInformationComponent,
    FishSelectComponent,
    FishPhotoSelectComponent,
    FishCreateButtonComponent,
    FishDetailViewComponent,
    FishEditViewComponent,
    FishCardComponent,
    FishAddPhotoButtonComponent,

    SpeciesDetailFormComponent,
    SpeciesSelectComponent,
    SpeciesTableComponent,
    SpeciesDetailViewComponent,
    SpeciesCardComponent,

    DeviceDetailFormComponent,
    DeviceDetailViewComponent,
    ManageAquariumDeviceModalComponent,

    AquariumSelectComponent,
    AquariumTableComponent,
    SelectAquariumModalComponent,


    TaskListComponent,
    TaskTabComponent,
    NotificationsListComponent,

    FeedingTableListComponent,
    FeedingDetailFormComponent,


    /* Modals */
    ConfirmModalComponent,
    BugReportModalComponent,
    FishFeedModalComponent,
    ErrorMessageModalComponent,
    MasterDashboardComponent,
    SettingsComponent,
    TaskTableComponent,
    CreateAquariumModelComponent,
    FishAddModalComponent,
    ManageSpeciesModalComponent,
    ScraperModalComponent,
    PhotoExpandedModalComponent,
    ManagePhotoConfigurationModal,
    FishPhotoModal,
    FishPhotoSelectModal,
    ManageSnapshotModal,
    LoginModalComponent,
    //New components here
  ],
  entryComponents: [
    //Modal components here
    CreateAquariumModelComponent,
    ConfirmModalComponent,
    BugReportModalComponent,
    FishFeedModalComponent,
    ErrorMessageModalComponent,
    ManageSpeciesModalComponent,
    FishAddModalComponent,
    ManageAquariumDeviceModalComponent,
    SelectAquariumModalComponent,
    ScraperModalComponent,
    PhotoExpandedModalComponent,
    ManagePhotoConfigurationModal,
    ManageSnapshotModal,
    LoginModalComponent,
    FishPhotoModal,
    FishPhotoSelectModal,
  ],

  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    MatInputModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
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
    ReactiveFormsModule,
    ColorPickerModule,
    FontAwesomeModule,

    OwlDateTimeModule,
    OwlNativeDateTimeModule,

    StoreModule.forRoot({}),
    StoreModule.forFeature('aquariums', aquariumReducer),
    StoreModule.forFeature('snapshots', snapshotReducer),
    StoreModule.forFeature('species', speciesReducer),
    StoreModule.forFeature('fish', fishReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    NotifierModule.withConfig(AquariumNotifierConfig),
    EffectsModule.forRoot([AquariumEffects, SnapshotEffects, SpeciesEffects, FishEffects]),
    AppRoutingModule
  ],
  providers: [
    AquariumService,
    AuthService,
    AdminService,
    AuthGuard,
    //Providers for authenticaion
    { provide: HTTP_INTERCEPTORS, useClass: AquariumInterceptor, multi: true },
    //{ provide: 'OAuth.Environment', useValue: environment.environmentTag },
    //{ provide: 'OAuth.ClientName', useValue: environment.appName },
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

