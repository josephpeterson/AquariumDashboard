//this is modelled from your app.module.ts and the components and 
//services are just arbitrary examples, your module might be different
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { DeviceInformationCardComponent } from './components/device-information-card/device-information-card.component';
import { DeviceRoutes } from './device-routing.module';
import { SharedModule } from '../SharedModule/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Ng5SliderModule } from 'ng5-slider';
import { DeviceDetailFormComponent } from './settings/device-detail-form/device-detail-form.component';
import { DeviceLogCardComponent } from './components/device-log-card/device-log-card.component';
import { AquariumService } from 'src/app/services/aquarium.service';
import { FishService } from 'src/app/services/fish.service';
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';
import { AuthGuard } from 'src/app/guards/AuthGuard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AquariumInterceptor } from 'src/app/services/aquarium.interceptor';
import { DeviceATOStatusComponent } from './components/device-ato-status-card/device-ato-status-card.component';
import { DeviceSnapshotCarouselComponent } from './components/device-snapshot-carousel/device-snapshot-carousel.component';
import { NotificationService } from 'src/app/services/notification.service';
import { DeviceOverviewComponent } from './overview/device-overview.component';
import { DeviceSettingsComponent } from './settings/device-settings.component';
import { AquariumDeviceScheduleContainerComponent } from './schedule/aquarium-device-schedule-container.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeviceScheduledJobCardComponent } from './components/device-scheduled-job-card/device-scheduled-job-card.component';
import { DeviceScheduledJobListItemComponent } from './components/device-scheduled-job-list-item/device-scheduled-job-list-item.component';
import { AquariumDeviceComponent } from './aquarium-device.component';
import { DeviceSensorsComponent } from './sensors/sensors.component';
import { DeviceWaterChangeCardComponent } from './components/device-water-change-card/device-water-change-card.component';
import { DeviceConnectionBannerComponent } from './components/device-overview-card/device-connection-banner.component';
import { AquariumDeviceMixingStationContainerComponent } from './mixing-station/aquarium-device-mixing-station-container.component';
import { SharedDeviceModule } from '../SharedDeviceModule/shared-device.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SharedDeviceModule,

    FormsModule,
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
    MatProgressBarModule,
    MatTooltipModule,
    Ng5SliderModule,
    DeviceRoutes //<-- import
  ],
  declarations: [
    DeviceConnectionBannerComponent,
    DeviceInformationCardComponent,
    
    AquariumDeviceScheduleContainerComponent,
    AquariumDeviceMixingStationContainerComponent,
    
    DeviceOverviewComponent,
    DeviceATOStatusComponent,
    DeviceWaterChangeCardComponent,
    DeviceSnapshotCarouselComponent,
    
    
    DeviceSensorsComponent,
    DeviceScheduledJobCardComponent,
    DeviceScheduledJobListItemComponent,
    
    DeviceSettingsComponent,
    DeviceLogCardComponent,
    AquariumDeviceComponent,
    DeviceDetailFormComponent,
  ],
  exports: [
    DeviceDetailFormComponent
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
export class DeviceModule {}