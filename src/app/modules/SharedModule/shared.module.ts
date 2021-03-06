//this is modelled from your app.module.ts and the components and 
//services are just arbitrary examples, your module might be different
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerModule } from 'ngx-color-picker';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { BugReportModalComponent } from './modals/bugreport-modal/bugreport-modal.component';
import { FishFeedModalComponent } from './modals/fish-feed-modal/fish-feed-modal.component';
import { ErrorMessageModalComponent } from './modals/error-message-modal/error-message-modal.component';
import { CreateAquariumModelComponent } from './modals/create-aquarium-modal/create-aquarium-modal.component';
import { CreateScheduleModalComponent } from './modals/create-schedule-modal/create-schedule-modal.component';
import { FishAddModalComponent } from './modals/fish-add-modal/fish-add-modal.component';
import { CreateSpeciesModalComponent } from './modals/create-species-modal/create-species-modal.component';
import { ScraperModalComponent } from './modals/scraper-modal/scraper-modal.component';
import { PhotoExpandedModalComponent } from './modals/photo-expanded-modal/photo-expanded-modal.component';
import { ManagePhotoConfigurationModal } from './modals/manage-photo-configuration/manage-photo-configuration.component';
import { FishPhotoModal } from './modals/fish-photo-modal/fish-photo-modal.component';
import { FishPhotoSelectModal } from './modals/fish-photo-select-modal/fish-photo-select-modal.component';
import { FishDiseaseModalComponent } from './modals/fish-disease-modal/fish-disease-modal.component';
import { FishBreedModalComponent } from './modals/fish-breed-modal/fish-breed-modal.component';
import { FishTransferModalComponent } from './modals/fish-transfer-modal/fish-transfer-modal.component';
import { ManageSnapshotModal } from './modals/manage-snapshot-modal/manage-snapshot-modal.component';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { PostCreateCategoryModalComponent } from './modals/post-create-category-modal/post-create-category-modal.component';
import { PostCreateBoardModalComponent } from './modals/post-create-board-modal/post-create-board-modal.component';
import { PostCreateThreadModalComponent } from './modals/post-create-thread-modal/post-create-thread-modal.component';
import { PostDeleteCategoryModalComponent } from './modals/post-delete-category-modal/post-delete-category-modal.component';
import { PostDeleteBoardModalComponent } from './modals/post-delete-board-modal/post-delete-board-modal.component';
import { PostDeleteThreadModalComponent } from './modals/post-delete-thread-modal/post-delete-thread-modal.component';
import { ForgotPasswordModalComponent } from './modals/forgot-password-modal/forgot-password-modal.component';
import { SelectAquariumModalComponent } from './modals/select-aquarium-modal/select-aquarium-modal.component';
import { PhotoApplyModalComponent } from './modals/photo-apply-modal/photo-apply-modal.component';
import { CreateNotificationModalComponent } from './modals/create-notification-modal/create-notification-modal.component';
import { CreateTimelapseModalComponent } from './modals/create-timelapse-modal/create-timelapse-modal.component';
import { SelectScheduleModalComponent } from './modals/select-schedule-modal/select-schedule-modal.component';
import { CreateScheduleTaskModalComponent } from './modals/create-schedule-task-modal/create-schedule-task-modal.component';
import { MatProgressSpinnerModule, MatSidenavModule, MatCardModule, MatTableModule, MatTabsModule, MatCheckboxModule, MatInputModule, MatRadioModule, MatSortModule, MatMenuModule, MatIconModule, MatListModule, MatToolbarModule, MatFormFieldModule, MatPaginatorModule, MatSelectModule, MatDialogModule, MatSliderModule, MatButtonModule, MatDatepickerModule, MatAutocompleteModule, MatNativeDateModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NavMenuNotificationsComponent } from './nav-menu/notifications/notifications.component';
import { SearchFormComponent } from './nav-menu/search-form/search-form.component';
import { ProfileIconBadgeComponent } from 'src/app/modules/SharedModule/profile-icon-badge/profile-icon-badge.component';
import { FollowButtonComponent } from 'src/app/modules/SharedModule/follow-button/follow-button.component';
import { BugReportButtonComponent } from './bugreport-button/bugreport-button.component';
import { LoadingContainerComponent } from './loading-container/loading-container.component';
import { ScheduleTaskTableComponent } from './schedule-task-table/schedule-task-table.component';
import { SnapshotCarouselComponent } from './data/snapshot/carousel/snapshot-carousel.component';
import { SnapshotTakeButtonComponent } from './data/snapshot/take-button/snapshot-take-button.component';
import { SnapshotDeleteButtonComponent } from './data/snapshot/delete-button/snapshot-delete-button.component';
import { FishTableListComponent } from './data/fish/table-list/fish-table-list.component';
import { AquariumSelectComponent } from './data/aquarium/select/aquarium-select.component';
import { SpeciesTableComponent } from './data/species/species-table/species-table.component';
import { SpeciesDetailFormComponent } from './data/species/species-detail-form/species-detail-form.component';
import { FishInformationComponent } from './data/fish/fish-information/fish-information.component';
import { FishSelectComponent } from './data/fish/select/fish-select.component';
import { FeedingTableListComponent } from './data/feeding/feeding-table/feeding-table-list.component';
import { FeedingDetailFormComponent } from './data/feeding/feeding-detail-form/feeding-detail-form.component';
import { SpeciesDetailViewComponent } from './data/species/species-detail-view/species-detail-view.component';
import { AquariumTableComponent } from './data/aquarium/aquarium-table/aquarium-table.component';
import { FishCreateButtonComponent } from './data/fish/create-button/fish-create-button.component';
import { SnapshotTableListComponent } from './data/snapshot/table-list/snapshot-table-list.component';
import { SnapshotDetailComponent } from './data/snapshot/snapshot-detail-form/snapshot-detail-form.component';
import { AttachmentUploaderComponent } from './attachment-uploader/attachment-uploader.component';
import { SnapshotDetailChartComponent } from './data/snapshot/snapshot-detail-chart/snapshot-detail-chart.component';
import { FishCardComponent } from './data/fish/fish-card/fish-card.component';
import { DeviceDetailViewComponent } from './data/device/device-detail-view/device-detail-view.component';
import { SpeciesCardComponent } from './data/species/species-card/species-card.component';
import { FishAddFormComponent } from './data/fish/fish-add-form/fish-add-form.component';
import { FishAddPhotoButtonComponent } from './data/fish/add-photo-button/fish-add-photo-button.component';
import { AutocompleteTypeComponent } from './autocomplete-type/autocomplete-type.component';
import { AquariumNavBarComponent } from './aquarium-nav-bar/aquarium-nav-bar.component';
import { FishPhotoSelectComponent } from './data/fish/photo-select/fish-photo-select.component';
import { FishCardDetailedComponent } from 'src/app/modules/SharedModule/fish-card-detailed/fish-card-detailed.component';
import { ApplicationLogViewComponent } from './application-log-view/application-log-view.component';
import { PhotoPaginator } from './photo-paginator/photo-paginator.component';
import { StandardTableComponent } from './standard-table/standard-table.component';
import { VisualAquariumComponent } from './visual-aquarium/visual-aquarium.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TypeSelectComponent } from './type-select/type-select.component';
import { SnapshotPhotoConfigDetail } from './photo-config-detail/snapshot-photo-config-detail.component';
import { PhotoCardComponent } from './data/photo/photo-card/photo-card.component';
import { EquipmentTableComponent } from './equipment-table/equipment-table.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskTableComponent } from './task-table/task-table.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AquariumService } from 'src/app/services/aquarium.service';
import { FishService } from 'src/app/services/fish.service';
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';
import { AuthGuard } from 'src/app/guards/AuthGuard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AquariumInterceptor } from 'src/app/services/aquarium.interceptor';
import { SpeciesSelectComponent } from './species-select/species-select.component';
import { FishPhotosComponent } from 'src/app/modules/SharedModule/fish-photos/fish-photos.component';
import { GenericSelectComponent } from './form/generic-select/generic-select.component';
import { CreateDeviceSensorModalComponent } from './modals/create-device-sensor-modal/create-device-sensor-modal.component';
import { RunATOModalComponent } from './modals/run-ato-modal/run-ato-modal.component';



var modals = [
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
  CreateScheduleTaskModalComponent,
  CreateDeviceSensorModalComponent,
  RunATOModalComponent
]
@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,


    /* Material */
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

    /* Misc. */
    OwlDateTimeModule,
    OwlNativeDateTimeModule,

  ],
  declarations: [
    /* Nav Menu */
    NavMenuComponent,
    NavMenuNotificationsComponent,
    SearchFormComponent,
    ProfileIconBadgeComponent,

    FollowButtonComponent,
    BugReportButtonComponent,
    LoadingContainerComponent,
    ScheduleTaskTableComponent,


    SnapshotCarouselComponent,
    SnapshotTakeButtonComponent,
    SnapshotDeleteButtonComponent,
    FishTableListComponent,
    AquariumSelectComponent,
    SpeciesTableComponent,
    SpeciesDetailFormComponent,
    FishInformationComponent,
    FishPhotosComponent,
    FishSelectComponent,
    FeedingTableListComponent,
    FeedingDetailFormComponent,
    SpeciesDetailViewComponent,
    AquariumTableComponent,
    FishCreateButtonComponent,
    SnapshotTableListComponent,
    SnapshotDetailComponent,
    AttachmentUploaderComponent,
    SnapshotDetailChartComponent,
    FishCardComponent,
    DeviceDetailViewComponent,
    SpeciesCardComponent,
    FishAddFormComponent,
    FishAddPhotoButtonComponent,
    AutocompleteTypeComponent,
    AquariumNavBarComponent,
    FishPhotoSelectComponent,
    FishCardDetailedComponent,
    ApplicationLogViewComponent,
    PhotoPaginator,
    StandardTableComponent,
    VisualAquariumComponent,
    SideBarComponent,
    TypeSelectComponent,
    SnapshotPhotoConfigDetail,
    PhotoCardComponent,
    EquipmentTableComponent,
    TaskListComponent,
    TaskTableComponent,
    
    
    /* Form Components */
    SpeciesSelectComponent,
    SpeciesTableComponent,
    PageNotFoundComponent,
    GenericSelectComponent,

    ...modals,
  ],
  exports: [
    CommonModule,
    NavMenuComponent,
    SideBarComponent,
    LoadingContainerComponent,
    FollowButtonComponent, // Maybe?
    ScheduleTaskTableComponent, // Maybe?
    SnapshotPhotoConfigDetail, // Maybe? Deprecate?
    SpeciesDetailViewComponent, //Deprecate?
    SpeciesTableComponent,
    AquariumTableComponent,
    ApplicationLogViewComponent,
    PhotoPaginator,
    SpeciesCardComponent,
    PhotoCardComponent,
    AttachmentUploaderComponent,
    FishAddPhotoButtonComponent,
    FeedingTableListComponent,
    FishPhotoSelectComponent,
    FishPhotosComponent,
    ProfileIconBadgeComponent,
    VisualAquariumComponent,
    StandardTableComponent,
    EquipmentTableComponent,
    DeviceDetailViewComponent,
    FishCreateButtonComponent,
    FishCardComponent,
    TaskListComponent,
    TaskTableComponent,
    FishCardDetailedComponent,
    SnapshotTableListComponent,



    /* Form Components */
    SpeciesSelectComponent,
    TypeSelectComponent,
    GenericSelectComponent,



    ...modals,
  ],
  entryComponents: [
    ...modals,
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
})
export class SharedModule { }