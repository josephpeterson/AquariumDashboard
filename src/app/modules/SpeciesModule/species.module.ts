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
import { SharedModule } from '../SharedModule/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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