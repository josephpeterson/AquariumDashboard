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
import { MatDatepickerModule, MatFormFieldModule, MatSidenavModule, MatProgressSpinnerModule, MatCardModule, MatTableModule, MatTabsModule, MatCheckboxModule, MatInputModule, MatRadioModule, MatSortModule, MatMenuModule, MatIconModule, MatListModule, MatToolbarModule, MatPaginatorModule, MatSelectModule, MatDialogModule, MatSliderModule, MatButtonModule, MatAutocompleteModule, MatNativeDateModule } from '@angular/material';
import { CreateAquariumComponent } from '../../components/containers/AquariumContainer/create-aquarium/create-aquarium.component';
import { AquariumContainer } from '../../components/containers/AquariumContainer/aquarium-container.component';
import { DashboardComponent } from '../../components/containers/AquariumContainer/dashboard/dashboard.component';
import { FishComponent } from '../../components/containers/AquariumContainer/fish/fish.component';
import { LightingComponent } from '../../components/containers/AquariumContainer/lighting/lighting.component';
import { AquariumParametersComponent } from '../../components/containers/AquariumContainer/parameters/aquarium-parameters.component';
import { ParametersSnapshotListComponent } from '../../components/containers/AquariumContainer/parameters/snapshots/parameters-snapshot-list.component';
import { ParametersWaterTestsListComponent } from '../../components/containers/AquariumContainer/parameters/water-tests/parameters-water-tests-list.component';
import { AquariumPhotosContainerComponent } from '../../components/containers/AquariumContainer/photos/aquarium-photos-container.component';
import { AquariumPhotosComponent } from '../../components/containers/AquariumContainer/photos/aquarium/aquarium-photos.component';
import { SnapshotPhotosComponent } from '../../components/containers/AquariumContainer/photos/snapshot/snapshot-photos.component';
import { SettingsComponent } from '../../components/containers/AquariumContainer/settings/settings.component';
import { MaintenanceComponent } from '../../components/containers/AquariumContainer/maintenance/maintenance.component';
import { SharedModule } from '../SharedModule/shared.module';
import { AppModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { Ng5SliderModule } from 'ng5-slider';
import { ColorPickerModule } from 'ngx-color-picker';
import { WaterChangeTableComponent } from '../../components/containers/AquariumContainer/parameters/water-change-table/water-change-table.component';
import { WaterChangeComponent } from '../../components/containers/AquariumContainer/parameters/water-change/water-change.component';
import { WaterDoseComponent } from '../../components/containers/AquariumContainer/parameters/water-dose/water-dose.component';
import { WaterChangeListComponent } from '../../components/containers/AquariumContainer/maintenance/water-change-list/water-change-list.component';
import { EquipmentListComponent } from '../../components/containers/AquariumContainer/maintenance/equipment-list/equipment-list.component';
import { DosingListComponent } from '../../components/containers/AquariumContainer/maintenance/dosing-list/dosing-list.component';
import { TaskTabComponent } from '../../components/containers/AquariumContainer/maintenance/task-tab/task-list.component';
import { NotificationsListComponent } from '../../components/containers/AquariumContainer/maintenance/notifications-list/notifications-list.component';
import { OverviewContainer } from './OverviewContainer/overview-container.component';
import { OverviewRoutes } from './overview-routing.module';
import { TemperatureHistogramComponent } from './temperature-histogram/temperature-histogram.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ColorPickerModule,


    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

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
    OverviewRoutes //<-- import
  ],
  declarations: [
    OverviewContainer,
    TemperatureHistogramComponent,
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
export class OverviewModule {}