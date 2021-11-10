//this is modelled from your app.module.ts and the components and 
//services are just arbitrary examples, your module might be different
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { DeviceInformationComponent } from './settings/information/device-information.component';
import { DevicePeripherialsComponent } from './Peripherials/peripherials.component';
import { DeviceScheduleStatusComponent } from './schedule/schedule-status/schedule-status.component';
import { ScheduleBuilderComponent } from './schedule/schedule-builder/schedule-builder.component';
import { DeviceRoutes } from './device-routing.module';
import { AquariumDeviceComponent } from './DeviceContainer/aquarium-device.component';
import { SharedModule } from '../SharedModule/shared.module';
import { AppModule } from 'src/app/app.module';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng5SliderModule } from 'ng5-slider';
import { DeviceDetailFormComponent } from './settings/device-detail-form/device-detail-form.component';
import { DeviceLogComponent } from './settings/device-log/device-log.component';
import { AquariumService } from 'src/app/services/aquarium.service';
import { FishService } from 'src/app/services/fish.service';
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';
import { AuthGuard } from 'src/app/guards/AuthGuard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AquariumInterceptor } from 'src/app/services/aquarium.interceptor';
import { DeviceSensorsComponent } from './sensors/sensors.component';
import { DeviceATOStatusComponent } from './ato-status/ato-status.component';
import { DeviceSensorCardComponent } from './device-sensor-card/device-sensor-card.component';
import { DeviceOverviewCardComponent } from './device-overview-card/device-overview-card.component';
import { DeviceSnapshotCarouselComponent } from './device-snapshot-carousel/device-snapshot-carousel.component';
import { NotificationService } from 'src/app/services/notification.service';
import { DeviceOverviewComponent } from './overview/device-overview.component';
import { DeviceSettingsComponent } from './settings/device-settings.component';
import { DeviceScheduleComponent } from './schedule/device-schedule.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,

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
    Ng5SliderModule,
    DeviceRoutes //<-- import
  ],
  declarations: [
    AquariumDeviceComponent,
    DeviceDetailFormComponent,
    DeviceLogComponent,
    DeviceOverviewCardComponent,
    DeviceSensorCardComponent,
    DeviceInformationComponent,
    DevicePeripherialsComponent,
    DeviceSensorsComponent,
    ScheduleBuilderComponent,
    DeviceScheduleStatusComponent,
    DeviceATOStatusComponent,
    DeviceSnapshotCarouselComponent,
    DeviceOverviewComponent,
    DeviceSettingsComponent,
    DeviceScheduleComponent,
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