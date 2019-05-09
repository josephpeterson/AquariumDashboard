import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule, MatInputModule, MatSelectModule, MatCard, MatDialogModule, MatButton, MatButtonModule } from '@angular/material';
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


//Component declarations
import { AppComponent } from './components/app-root/app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AquariumPreviewComponent } from './components/aquarium-preview/aquarium-preview.component';


//Misc.
import { environment } from './environments/environment';
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

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    DashboardComponent,
    FishComponent,
    LightingComponent,
    MaintenanceComponent,
    SettingsComponent,
    AquariumPreviewComponent,
    AquariumPreviewScrollerComponent,
    TaskListComponent,
    OperationsComponent,
    TaskTableComponent,
    //New components here
  ],
  entryComponents: [
    //Modal components here
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'maintenance/:tab', component: MaintenanceComponent,},
      { path: 'fish', component: FishComponent, pathMatch: 'full' },
      { path: 'lighting', component: LightingComponent, pathMatch: 'full' },
      { path: 'settings', component: SettingsComponent, pathMatch: 'full' },
      //New routes here
      //{ path: 'counterparty', component: CounterpartyDetailComponent, pathMatch: 'full' },
    ]),
    MatProgressSpinnerModule,
    MatCardModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    MatInputModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  providers: [
    //Providers for authenticaion
    //{ provide: HTTP_INTERCEPTORS, useClass: ConfigVaultInterceptor, multi: true },
    //{ provide: 'OAuth.Environment', useValue: environment.environmentTag },
    //{ provide: 'OAuth.ClientName', useValue: environment.appName },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

