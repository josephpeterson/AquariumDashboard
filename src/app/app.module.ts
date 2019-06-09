import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule, MatInputModule, MatSelectModule, MatCard, MatDialogModule, MatButton, MatButtonModule, MatNativeDateModule, MatSelectTrigger, MatAutocompleteModule } from '@angular/material';
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
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { DashboardComponent } from './components/containers/dashboard/dashboard.component';


//Misc.
import { FishComponent } from './components/containers/fish/fish.component';
import { MaintenanceComponent } from './components/containers/maintenance/maintenance.component';
import { SettingsComponent } from './components/containers/settings/settings.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { OperationsComponent } from './components/operations/operations.component';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { LightingComponent } from './components/containers/lighting/lighting.component';


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

import { AquariumSelectionComponent } from './components/containers/aquarium-selection/aquarium-selection.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorMessageModalComponent } from './components/modals/error-message-modal/error-message-modal.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { CreateAquariumModelComponent } from './components/modals/create-aquarium-modal/create-aquarium-modal.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { NotifierModule } from 'angular-notifier';
import { AquariumNotifierConfig } from './config/notifier';
import { SnapshotListComponent } from './components/containers/maintenance/snapshot-list/snapshot-list.component';
import { FeedingListComponent } from './components/containers/maintenance/feeding-list/feeding-list.component';
import { NotificationsListComponent } from './components/containers/maintenance/notifications-list/notifications-list.component';
import { FeedTableComponent } from './components/containers/maintenance/feed-table/feed-table.component';
import { TaskTabComponent } from './components/containers/maintenance/task-tab/task-list.component';
import { SnapshotCarouselComponent } from './components/snapshot-carousel/snapshot-carousel.component';
import { SnapshotTakeButtonComponent } from './components/snapshot-take-button/snapshot-take-button.component';
import { SnapshotDeleteButtonComponent } from './components/snapshot-delete-button/snapshot-delete-button.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    DashboardComponent,

    FishComponent,

    LightingComponent,

    MaintenanceComponent,

    SnapshotCarouselComponent,
    SnapshotListComponent,
    SnapshotTakeButtonComponent,
    SnapshotDeleteButtonComponent,

    TaskListComponent,
    TaskTabComponent,
    FeedingListComponent,
    NotificationsListComponent,
    FeedTableComponent,

    SettingsComponent,
    AquariumSelectionComponent,
    OperationsComponent,
    TaskTableComponent,
    ErrorMessageModalComponent,
    CreateAquariumModelComponent,
    ConfirmModalComponent,
    //New components here
  ],
  entryComponents: [
    //Modal components here
    CreateAquariumModelComponent,
    ConfirmModalComponent,
    ErrorMessageModalComponent
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
    ReactiveFormsModule,
    ColorPickerModule,
    FontAwesomeModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('aquariums', aquariumReducer),
    StoreModule.forFeature('snapshots', snapshotReducer),
    StoreModule.forFeature('species', speciesReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    NotifierModule.withConfig(AquariumNotifierConfig),
    EffectsModule.forRoot([AquariumEffects, SnapshotEffects,SpeciesEffects]),
    AppRoutingModule
  ],
  providers: [
    //Providers for authenticaion
    //{ provide: HTTP_INTERCEPTORS, useClass: ConfigVaultInterceptor, multi: true },
    //{ provide: 'OAuth.Environment', useValue: environment.environmentTag },
    //{ provide: 'OAuth.ClientName', useValue: environment.appName },
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

