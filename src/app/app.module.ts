import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule, MatInputModule, MatSelectModule, MatDialogModule, MatButtonModule, MatNativeDateModule, MatAutocompleteModule, MatSidenav, MatSidenavModule, MatRadioModule } from '@angular/material';
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
import { NotificationsListComponent } from './components/containers/AquariumContainer/maintenance/notifications-list/notifications-list.component';
import { TaskTabComponent } from './components/containers/AquariumContainer/maintenance/task-tab/task-list.component';
import { SnapshotCarouselComponent } from './components/data/snapshot/carousel/snapshot-carousel.component';
import { SnapshotTakeButtonComponent } from './components/data/snapshot/take-button/snapshot-take-button.component';
import { SnapshotDeleteButtonComponent } from './components/data/snapshot/delete-button/snapshot-delete-button.component';
import { FishTableListComponent } from './components/data/fish/table-list/fish-table-list.component';
import { SpeciesSelectComponent } from './components/data/species/select/species-select.component';
import { AquariumSelectComponent } from './components/data/aquarium/select/aquarium-select.component';
import { SpeciesTableComponent } from './components/data/species/species-table/species-table.component';
import { SpeciesDetailFormComponent } from './components/data/species/species-detail-form/species-detail-form.component';
import { FishInformationComponent } from './components/data/fish/fish-information/fish-information.component';
import { FishSelectComponent } from './components/data/fish/select/fish-select.component';
import { FishAddModalComponent } from './components/shared/modals/fish-add-modal/fish-add-modal.component';
import { FeedingTableListComponent } from './components/data/feeding/feeding-table/feeding-table-list.component';
import { FeedingDetailFormComponent } from './components/data/feeding/feeding-detail-form/feeding-detail-form.component';
import { AquariumContainer } from './components/containers/AquariumContainer/aquarium-container.component';
import { SpeciesDetailViewComponent } from './components/data/species/species-detail-view/species-detail-view.component';
import { ScraperModalComponent } from './components/shared/modals/scraper-modal/scraper-modal.component';
import { AquariumTableComponent } from './components/data/aquarium/aquarium-table/aquarium-table.component';
import { SelectAquariumModalComponent } from './components/shared/modals/select-aquarium-modal/select-aquarium-modal.component';
import { FishDetailViewComponent } from './components/containers/FishContainer/fish-detail-view/fish-detail-view.component';
import { FishEffects } from './store/fish/fish.effect';
import { fishReducer } from './store/fish/fish.reducer';
import { DeviceDetailFormComponent } from './components/containers/AquariumContainer/device/device-detail-form/device-detail-form.component';
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
import { AquariumPhotosContainerComponent } from './components/containers/AquariumContainer/photos/aquarium-photos-container.component';
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
import { ProfileContainer } from './components/containers/ProfileContainer/profile-container.component';
import { ProfilePictureThumbnailComponent } from './components/containers/ProfileContainer/profile-picture-thumbnail/profile-picture-thumbnail.component';
import { ProfileBannerComponent } from './components/containers/ProfileContainer/profile-banner/profile-banner.component';
import { StarButtonComponent } from './components/containers/ProfileContainer/star-button/star-button.component';
import { FollowButtonComponent } from './components/containers/ProfileContainer/follow-button/follow-button.component';
import { AquariumSectionComponent } from './components/containers/ProfileContainer/aquarium-section/aquarium-section.component';
import { FishSectionComponent } from './components/containers/ProfileContainer/fish-section/fish-section.component';
import { GeneralSectionComponent } from './components/containers/ProfileContainer/general-section/general-section.component';
import { PhotoSectionComponent } from './components/containers/ProfileContainer/photo-section/photo-section.component';
import { ProfileIconBadgeComponent } from './components/containers/ProfileContainer/profile-icon-badge/profile-icon-badge.component';
import { SectionBannerComponent } from './components/containers/ProfileContainer/section-banner/section-banner.component';
import { ProfileActivityPostComponent } from './components/containers/ProfileContainer/posts/profile-activity-post/profile-activity-post.component';
import { CreateAquariumPostComponent } from './components/containers/ProfileContainer/posts/create-aquarium/create-aquarium-post.component';
import { AquariumTestResultsPostComponent } from './components/containers/ProfileContainer/posts/aquarium-test-results/aquarium-test-results-post.component';
import { SearchFormComponent } from './components/shared/nav-menu/search-form/search-form.component';
import { ProfileAboutComponent } from './components/containers/ProfileContainer/pages/profile-about/profile-about.component';
import { ProfileAquariumsComponent } from './components/containers/ProfileContainer/pages/profile-aquariums/profile-aquariums.component';
import { ProfileFishComponent } from './components/containers/ProfileContainer/pages/profile-fish/profile-fish.component';
import { ProfilePhotosComponent } from './components/containers/ProfileContainer/pages/profile-photos/profile-photos.component';
import { ProfileManageComponent } from './components/containers/ProfileContainer/pages/profile-manage/profile-manage.component';
import { ProfileReducer } from './store/profile/profile.reducer';
import { ProfileEffects } from './store/profile/profile.effect';
import { ProfileOverviewComponent } from './components/containers/ProfileContainer/pages/profile-overview/profile-overview.component';
import { MainPageComponent } from './components/containers/DiscussionContainer/main-page/main-page.component';
import { BoardPageComponent } from './components/containers/DiscussionContainer/board-page/board-page.component';
import { ThreadPageComponent } from './components/containers/DiscussionContainer/thread-page/thread-page.component';
import { DiscussionContainerComponent } from './components/containers/DiscussionContainer/discussion-container.component';
import { PostReducer } from './store/post/post.reducer';
import { PostEffects } from './store/post/post.effect';
import { PostCreateCategoryModalComponent } from './components/shared/modals/post-create-category-modal/post-create-category-modal.component';
import { PostCreateBoardModalComponent } from './components/shared/modals/post-create-board-modal/post-create-board-modal.component';
import { PostCreateThreadModalComponent } from './components/shared/modals/post-create-thread-modal/post-create-thread-modal.component';
import { DiscussionNavBarComponent } from './components/containers/DiscussionContainer/discussion-nav-bar/discussion-nav-bar.component';
import { DiscussionItemComponent } from './components/containers/DiscussionContainer/discussion-item/discussion-item.component';
import { PostDeleteCategoryModalComponent } from './components/shared/modals/post-delete-category-modal/post-delete-category-modal.component';
import { PostDeleteBoardModalComponent } from './components/shared/modals/post-delete-board-modal/post-delete-board-modal.component';
import { PostDeleteThreadModalComponent } from './components/shared/modals/post-delete-thread-modal/post-delete-thread-modal.component';
import { PostEditorComponent } from './components/containers/DiscussionContainer/post-editor/post-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PostTimestampComponent } from './components/containers/DiscussionContainer/post-timestamp/post-timestamp.component';
import { DiscussionPostComponent } from './components/containers/DiscussionContainer/discussion-post/discussion-post.component';
import { CreateThreadFormComponent } from './components/containers/DiscussionContainer/board-page/create-thread-form/create-thread-form.component';
import { BoardDetailComponent } from './components/containers/DiscussionContainer/board-page/board-detail/board-detail.component';
import { PostAuthorBadgeComponent } from './components/containers/DiscussionContainer/discussion-post/post-author-badge/post-author-badge.component';
import { ThreadBannerComponent } from './components/containers/DiscussionContainer/thread-page/thread-banner/thread-banner.component';
import { PasswordResetComponent } from './components/routes/passwordreset/password-reset.component';
import { ForgotPasswordModalComponent } from './components/shared/modals/forgot-password-modal/forgot-password-modal.component';
import { AquariumNavBarComponent } from './components/shared/aquarium-nav-bar/aquarium-nav-bar.component';
import { AppComponent } from './components/app-root/app.component';
import { NavMenuComponent } from './components/shared/nav-menu/nav-menu.component';
import { CreateSpeciesModalComponent } from './components/shared/modals/create-species-modal/create-species-modal.component';
import { TemperatureHistogramComponent } from './components/containers/DashboardContainer/temperature-histogram/temperature-histogram.component';
import { ProfileProgressionComponent } from './components/containers/AquariumContainer/dashboard/profile-progression/profile-progression.component';
import { CreateAquariumComponent } from './components/containers/AquariumContainer/create-aquarium/create-aquarium.component';
import { Ng5SliderModule } from 'ng5-slider';
import { AutocompleteTypeComponent } from './components/shared/autocomplete-type/autocomplete-type.component';
import { EquipmentTableComponent } from './components/containers/AquariumContainer/create-aquarium/equipment-table/equipment-table.component';
import { TypeSelectComponent } from './components/containers/AquariumContainer/create-aquarium/type-select/type-select.component';
import { FishCardDetailedComponent } from './components/containers/FishContainer/fish-card-detailed/fish-card-detailed.component';
import { FishTransferModalComponent } from './components/shared/modals/fish-transfer-modal/fish-transfer-modal.component';
import { FishDiseaseModalComponent } from './components/shared/modals/fish-disease-modal/fish-disease-modal.component';
import { FishBreedModalComponent } from './components/shared/modals/fish-breed-modal/fish-breed-modal.component';
import { FishService } from './services/fish.service';
import { PhotoApplyModalComponent } from './components/shared/modals/photo-apply-modal/photo-apply-modal.component';
import { EquipmentListComponent } from './components/containers/AquariumContainer/maintenance/equipment-list/equipment-list.component';
import { WaterChangeListComponent } from './components/containers/AquariumContainer/maintenance/water-change-list/water-change-list.component';
import { DosingListComponent } from './components/containers/AquariumContainer/maintenance/dosing-list/dosing-list.component';
import { AquariumDeviceComponent } from './components/containers/AquariumContainer/device/aquarium-device.component';
import { DevicePeripherialsComponent } from './components/containers/AquariumContainer/device/Peripherials/peripherials.component';
import { DeviceInformationComponent } from './components/containers/AquariumContainer/device/information/device-information.component';
import { PhotoCardComponent } from './components/data/photo/photo-card/photo-card.component';
import { ScheduleBuilderComponent } from './components/containers/AquariumContainer/device/schedule-builder/schedule-builder.component';
import { CreateScheduleModalComponent } from './components/shared/modals/create-schedule-modal/create-schedule-modal.component';
import { ScheduleTaskTableComponent } from './components/shared/modals/create-schedule-modal/schedule-task-table/schedule-task-table.component';
import { FishPhotoSelectComponent } from './components/data/fish/photo-select/fish-photo-select.component';
import { DeviceLogComponent } from './components/containers/AquariumContainer/device/device-log/device-log.component';
import { DeviceScheduleStatusComponent } from './components/containers/AquariumContainer/device/schedule-status/schedule-status.component';
import { ParametersSnapshotListComponent } from './components/containers/AquariumContainer/parameters/snapshots/parameters-snapshot-list.component';
import { ParametersWaterTestsListComponent } from './components/containers/AquariumContainer/parameters/water-tests/parameters-water-tests-list.component';
import { ApplicationLogViewComponent } from './components/shared/application-log-view/application-log-view.component';
import { SnapshotPhotosComponent } from './components/containers/AquariumContainer/photos/snapshot/snapshot-photos.component';
import { FishPhotosComponent } from './components/containers/AquariumContainer/photos/fish/fish-photos.component';
import { AquariumPhotosComponent } from './components/containers/AquariumContainer/photos/aquarium/aquarium-photos.component';
import { PhotoPaginator } from './components/shared/photo-paginator/photo-paginator.component';
import { SettingsNotificationsComponent } from './components/containers/SettingsContainer/admin/notifications/settings-notifications.component';
import { NotificationsTableComponent } from './components/containers/SettingsContainer/admin/notifications/notifications-table/notifications-table.component';
import { CreateNotificationModalComponent } from './components/shared/modals/create-notification-modal/create-notification-modal.component';
import { NavMenuNotificationsComponent } from './components/shared/nav-menu/notifications/notifications.component';
import { WaterChangeComponent } from './components/containers/AquariumContainer/parameters/water-change/water-change.component';
import { WaterDoseComponent } from './components/containers/AquariumContainer/parameters/water-dose/water-dose.component';
import { WaterChangeTableComponent } from './components/containers/AquariumContainer/parameters/water-change-table/water-change-table.component';
import { StandardTableComponent } from './components/shared/standard-table/standard-table.component';
import { VisualAquariumComponent } from './components/shared/visual-aquarium/visual-aquarium.component';
import { CreateTimelapseModalComponent } from './components/shared/modals/create-timelapse-modal/create-timelapse-modal.component';
import { SelectScheduleModalComponent } from './components/shared/modals/select-schedule-modal/select-schedule-modal.component';
import { CreateScheduleTaskModalComponent } from './components/shared/modals/create-schedule-task-modal/create-schedule-task-modal.component';
import { SideBarComponent } from './components/shared/side-bar/side-bar.component';
import { AquariumsContainer } from './components/containers/AquariumsContainer/aquariums-container.component';
import { CalendarContainerComponent } from './components/containers/calendar-container/calendar-container.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SpeciesContainer,
    FishContainer,
    MasterDashboardComponent,
    SettingsComponent,
    TaskTableComponent,


    /* New navigation */
    AquariumsContainer,


    HomeComponent,
    LoginComponent,
    SignupComponent,
    PasswordResetComponent,


    SettingsContainer,
    SettingsNavBarComponent,
    SettingsUsersComponent,
    SettingsLogsComponent,
    SettingsBugsComponent,
    SettingsGeneralComponent,
    SettingsPrivacyComponent,
    SettingsSecurityComponent,
    SettingsProfileComponent,
    SettingsNotificationsComponent,

    /* Admin components */
    UsersTableComponent,
    NotificationsTableComponent,
    BugsTableComponent,


    /* Misc. */
    AttachmentUploaderComponent,
    BugReportButtonComponent,
    LoadingContainerComponent,
    PhotoPaginator,

    /* Aquarium Container */
    AquariumContainer,
    DashboardComponent,
    FishComponent,
    LightingComponent,
    AquariumParametersComponent,
    ParametersSnapshotListComponent,
    ParametersWaterTestsListComponent,

    AquariumPhotosContainerComponent,
    AquariumPhotosComponent,
    SnapshotPhotosComponent,
    FishPhotosComponent,

    AquariumDeviceComponent,

    AquariumSelectComponent,
    AquariumTableComponent,

    DeviceDetailFormComponent,
    DeviceDetailViewComponent,



    /* Profile Container */
    ProfileContainer,
    ProfilePictureThumbnailComponent,

    MaintenanceComponent,
    WaterChangeListComponent,
    EquipmentListComponent,
    TaskListComponent,
    DosingListComponent,


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
    FeedingTableListComponent,
    FeedingDetailFormComponent,

    SpeciesDetailFormComponent,
    SpeciesSelectComponent,
    SpeciesTableComponent,
    SpeciesDetailViewComponent,
    SpeciesCardComponent,

    TaskTabComponent,
    NotificationsListComponent,






    ProfileBannerComponent,
    StarButtonComponent,
    FollowButtonComponent,
    AquariumSectionComponent,
    FishSectionComponent,
    GeneralSectionComponent,
    ProfileActivityPostComponent,
    CreateAquariumPostComponent,
    AquariumTestResultsPostComponent,
    PhotoSectionComponent,
    ProfileIconBadgeComponent,
    SectionBannerComponent,
    SearchFormComponent,
    ProfileAboutComponent,
    ProfileAquariumsComponent,
    ProfileFishComponent,
    ProfilePhotosComponent,
    ProfileManageComponent,
    ProfileOverviewComponent,
    DiscussionContainerComponent,
    MainPageComponent,
    BoardPageComponent,
    ThreadPageComponent,

    DiscussionNavBarComponent,
    AquariumNavBarComponent,
    SideBarComponent,
    DiscussionItemComponent,

    PostEditorComponent,
    PostTimestampComponent,
    DiscussionPostComponent,
    CreateThreadFormComponent,
    BoardDetailComponent,
    PostAuthorBadgeComponent,
    ThreadBannerComponent,
    ProfileProgressionComponent,
    TemperatureHistogramComponent,
    CreateAquariumComponent,
    AutocompleteTypeComponent,
    EquipmentTableComponent,
    TypeSelectComponent,
    FishCardDetailedComponent,

    //Modals
    ConfirmModalComponent,
    BugReportModalComponent,
    FishFeedModalComponent,
    ErrorMessageModalComponent,
    CreateAquariumModelComponent,
    FishAddModalComponent,
    CreateSpeciesModalComponent,
    ScraperModalComponent,
    PhotoExpandedModalComponent,
    ManagePhotoConfigurationModal,
    FishPhotoModal,
    FishPhotoSelectModal,
    FishDiseaseModalComponent,
    FishBreedModalComponent,
    FishTransferModalComponent,
    ManageSnapshotModal,
    LoginModalComponent,
    PostCreateCategoryModalComponent,
    PostCreateBoardModalComponent,
    PostCreateThreadModalComponent,
    PostDeleteCategoryModalComponent,
    PostDeleteBoardModalComponent,
    PostDeleteThreadModalComponent,
    ForgotPasswordModalComponent,
    SelectAquariumModalComponent,
    PhotoApplyModalComponent,
    DevicePeripherialsComponent,
    DeviceInformationComponent,
    DeviceScheduleStatusComponent,
    DeviceLogComponent,
    PhotoCardComponent,
    ScheduleBuilderComponent,
    CreateScheduleModalComponent,
    ScheduleTaskTableComponent,
    CreateNotificationModalComponent,
    SelectScheduleModalComponent,
    CreateScheduleTaskModalComponent,

    ApplicationLogViewComponent,

    NavMenuNotificationsComponent,

    WaterChangeComponent,

    WaterDoseComponent,

    WaterChangeTableComponent,

    StandardTableComponent,

    VisualAquariumComponent,

    CreateTimelapseModalComponent,

    CalendarContainerComponent,
  ],
  entryComponents: [
    ConfirmModalComponent,
    BugReportModalComponent,
    FishFeedModalComponent,
    ErrorMessageModalComponent,
    CreateAquariumModelComponent,
    CreateScheduleModalComponent,
    FishAddModalComponent,
    CreateSpeciesModalComponent,
    ScraperModalComponent,
    PhotoExpandedModalComponent,
    ManagePhotoConfigurationModal,
    FishPhotoModal,
    FishPhotoSelectModal,
    FishDiseaseModalComponent,
    FishBreedModalComponent,
    FishTransferModalComponent,
    ManageSnapshotModal,
    LoginModalComponent,
    PostCreateCategoryModalComponent,
    PostCreateBoardModalComponent,
    PostCreateThreadModalComponent,
    PostDeleteCategoryModalComponent,
    PostDeleteBoardModalComponent,
    PostDeleteThreadModalComponent,
    ForgotPasswordModalComponent,
    SelectAquariumModalComponent,
    PhotoApplyModalComponent,
    CreateNotificationModalComponent,
    CreateTimelapseModalComponent,
    SelectScheduleModalComponent,
    CreateScheduleTaskModalComponent
  ],

  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
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
    Ng5SliderModule,

    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CKEditorModule,

    StoreModule.forRoot({}),
    StoreModule.forFeature('aquariums', aquariumReducer),
    StoreModule.forFeature('snapshots', snapshotReducer),
    StoreModule.forFeature('species', speciesReducer),
    StoreModule.forFeature('fish', fishReducer),
    StoreModule.forFeature('profile', ProfileReducer),
    StoreModule.forFeature('post', PostReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    NotifierModule.withConfig(AquariumNotifierConfig),
    EffectsModule.forRoot([AquariumEffects, SnapshotEffects, SpeciesEffects, FishEffects, ProfileEffects, PostEffects]),
    AppRoutingModule
  ],
  providers: [
    AquariumService,
    FishService,
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

