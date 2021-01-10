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
import { SharedModule } from '../SharedModule/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { Ng5SliderModule } from 'ng5-slider';
import { ColorPickerModule } from 'ngx-color-picker';
import { SpeciesRoutes } from './species-routing.module';
import { TemperatureHistogramComponent } from './temperature-histogram/temperature-histogram.component';
import { SpeciesContainer } from './SpeciesContainer/species-container.component';
import { SpeciesProductCard } from './SpeciesProductCard/species-product-card.component';
import { SpeciesMasterListComponent } from './SpeciesMasterList/species-master-list.component';
import { SpeciesSearchRefinerComponent } from './SpeciesSearchRefiner/species-search-refiner.component';
import { SpeciesSearchFormComponent } from './SpeciesSearchForm/species-search-form.component';


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
    SpeciesRoutes //<-- import
  ],
  declarations: [
    SpeciesContainer,
    SpeciesMasterListComponent,
    SpeciesProductCard,
    SpeciesSearchRefinerComponent,
    SpeciesSearchFormComponent,
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
export class SpeciesModule {}