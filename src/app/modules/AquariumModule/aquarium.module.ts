//this is modelled from your app.module.ts and the components and 
//services are just arbitrary examples, your module might be different
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { AquariumRoutes } from './aquarium-routing.module';
import { AquariumService } from '../../services/aquarium.service';
import { FishService } from '../../services/fish.service';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
import { AuthGuard } from '../../guards/AuthGuard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AquariumInterceptor } from '../../services/aquarium.interceptor';
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
import { AquariumsContainer } from './AquariumsContainer/aquariums-container.component';
import { CreateAquariumComponent } from './create-aquarium/create-aquarium.component';
import { AquariumContainer } from './AquariumContainer/aquarium-container.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LightingComponent } from './lighting/lighting.component';
import { AquariumParametersComponent } from './parameters/aquarium-parameters.component';
import { ParametersOverviewComponent } from './parameters/overview/parameters-overview.component';
import { ParametersWaterListComponent } from './parameters/list/parameters-water-list.component';
import { AquariumPhotosContainerComponent } from './photos/aquarium-photos-container.component';
import { AquariumPhotosComponent } from './photos/aquarium/aquarium-photos.component';
import { SnapshotPhotosComponent } from './photos/snapshot/snapshot-photos.component';
import { SettingsComponent } from './settings/settings.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { SharedModule } from '../SharedModule/shared.module';
import { AppModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { Ng5SliderModule } from 'ng5-slider';
import { DeviceModule } from '../DeviceModule/device.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { WaterChangeTableComponent } from './parameters/water-change-table/water-change-table.component';
import { WaterChangeListComponent } from './maintenance/water-change-list/water-change-list.component';
import { EquipmentListComponent } from './maintenance/equipment-list/equipment-list.component';
import { DosingListComponent } from './maintenance/dosing-list/dosing-list.component';
import { TaskTabComponent } from './maintenance/task-tab/task-list.component';
import { NotificationsListComponent } from './maintenance/notifications-list/notifications-list.component';
import { NotificationService } from 'src/app/services/notification.service';
import { AquariumFishComponent } from './fish/aquarium-fish.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ColorPickerModule,

    DeviceModule, /* Aquarium Device Module */

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
    Ng5SliderModule,
    AquariumRoutes //<-- import
  ],
  declarations: [
    AquariumsContainer,
    AquariumContainer,
    CreateAquariumComponent,

    DashboardComponent,
    AquariumFishComponent,
    LightingComponent,
    AquariumParametersComponent,
    ParametersOverviewComponent,
    ParametersWaterListComponent,

    AquariumPhotosContainerComponent,
    AquariumPhotosComponent,
    SnapshotPhotosComponent,
    
    SettingsComponent,
    MaintenanceComponent,

    WaterChangeTableComponent,
    WaterChangeListComponent,
    EquipmentListComponent,
    DosingListComponent,
    TaskTabComponent,
    NotificationsListComponent,

  ],
  providers: [
    AquariumService,
    NotificationService,
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
export class AquariumModule {}