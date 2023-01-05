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
import { RouterModule } from '@angular/router';
import { CalendarRoutes } from './calendar-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalendarContainerComponent } from './calendar-container/calendar-container.component';
import { CoreModule } from '../CoreModule/core.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule,
    CalendarRoutes,

    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
  ],
  declarations: [
    CalendarContainerComponent
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
export class CalendarModule {}