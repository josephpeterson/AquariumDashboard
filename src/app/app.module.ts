import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule, MatInputModule, MatSelectModule, MatCard, MatDialogModule, MatButton, MatButtonModule, MatNativeDateModule } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material';

import {MatListModule} from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


//Component declarations
import { AppComponent } from './components/app-root/app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AquariumPreviewComponent } from './components/aquarium-preview/aquarium-preview.component';


//Misc.
import { FishComponent } from './components/fish/fish.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { OperationsComponent } from './components/operations/operations.component';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { AquariumPreviewScrollerComponent } from './components/aquarium-preview-scroller/aquarium-preview-scroller.component';
import { LightingComponent } from './components/lighting/lighting.component';


//Color picker
import { ColorPickerModule } from 'ngx-color-picker';
import { StoreModule } from '@ngrx/store';
import { AquariumSelectionComponent } from './components/aquarium-selection/aquarium-selection.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorMessageModalComponent } from './components/error-message-modal/error-message-modal.component';
import { aquariumReducer } from './store/aquarium/aquarium.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AquariumEffects } from './store/aquarium/aquarium.effect';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { CreateAquariumModelComponent } from './components/create-aquarium-modal/create-aquarium-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    DashboardComponent,
    FishComponent,
    LightingComponent,
    MaintenanceComponent,
    SettingsComponent,
    AquariumSelectionComponent,
    AquariumPreviewComponent,
    AquariumPreviewScrollerComponent,
    TaskListComponent,
    OperationsComponent,
    TaskTableComponent,
    ErrorMessageModalComponent,
    CreateAquariumModelComponent,
    //New components here
  ],
  entryComponents: [
    //Modal components here
    CreateAquariumModelComponent,
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
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    ColorPickerModule,
    FontAwesomeModule,
    StoreModule.forRoot({ aquariums: aquariumReducer}),
    EffectsModule.forRoot([AquariumEffects]),
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

