//this is modelled from your app.module.ts and the components and 
//services are just arbitrary examples, your module might be different
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { DeviceInformationComponent } from './information/device-information.component';
import { DevicePeripherialsComponent } from './Peripherials/peripherials.component';
import { DeviceScheduleStatusComponent } from './schedule-status/schedule-status.component';
import { ScheduleBuilderComponent } from './schedule-builder/schedule-builder.component';
import { DeviceRoutes } from './device-routing.module';
import { AquariumDeviceComponent } from './DeviceContainer/aquarium-device.component';
import { SharedModule } from '../SharedModule/shared.module';
import { AppModule } from 'src/app/app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { MatSidenavModule, MatProgressSpinnerModule, MatCardModule, MatTableModule, MatTabsModule, MatCheckboxModule, MatInputModule, MatRadioModule, MatSortModule, MatMenuModule, MatIconModule, MatListModule, MatToolbarModule, MatFormFieldModule, MatPaginatorModule, MatSelectModule, MatDialogModule, MatSliderModule, MatButtonModule, MatDatepickerModule, MatAutocompleteModule, MatNativeDateModule, MatProgressBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { Ng5SliderModule } from 'ng5-slider';
import { DeviceDetailFormComponent } from './device-detail-form/device-detail-form.component';
import { DeviceLogComponent } from './device-log/device-log.component';
import { AquariumService } from 'src/app/services/aquarium.service';
import { FishService } from 'src/app/services/fish.service';
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';
import { AuthGuard } from 'src/app/guards/AuthGuard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AquariumInterceptor } from 'src/app/services/aquarium.interceptor';
import { DeviceSensorsComponent } from './sensors/sensors.component';
import { DeviceATOStatusComponent } from './ato-status/ato-status.component';


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
    MatFileUploadModule,
    MatProgressBarModule,
    Ng5SliderModule,
    DeviceRoutes //<-- import
  ],
  declarations: [
    AquariumDeviceComponent,
    DeviceDetailFormComponent,
    DeviceLogComponent,
    DeviceInformationComponent,
    DevicePeripherialsComponent,
    DeviceSensorsComponent,
    ScheduleBuilderComponent,
    DeviceScheduleStatusComponent,
    DeviceATOStatusComponent
  ],
  exports: [
    DeviceDetailFormComponent
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
export class DeviceModule {}