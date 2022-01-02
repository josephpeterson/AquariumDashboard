import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';

import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

import { MatListModule } from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Color picker
import { ColorPickerModule } from 'ngx-color-picker';

//ngRx Store support
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AquariumEffects } from './store/aquarium/aquarium.effect';
import { SnapshotEffects } from './store/snapshot/snapshot.effect';
import { SpeciesEffects } from './store/species/species.effect';
import { aquariumReducer } from './store/aquarium/aquarium.reducer';
import { snapshotReducer } from './store/snapshot/snapshot.reducer';
import { speciesReducer } from './store/species/species.reducer';

import { AppRoutingModule } from './app-routing.module';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
//import { NotifierModule } from 'angular-notifier';
import { FishEffects } from './store/fish/fish.effect';
import { fishReducer } from './store/fish/fish.reducer';

import { AquariumInterceptor } from './services/aquarium.interceptor';
import { AquariumService } from './services/aquarium.service';
import { AuthGuard } from './guards/AuthGuard';
import { AuthService } from './services/auth.service';

import { AdminService } from './services/admin.service';
import { ProfileReducer } from './store/profile/profile.reducer';
import { ProfileEffects } from './store/profile/profile.effect';
import { PostReducer } from './store/post/post.reducer';
import { PostEffects } from './store/post/post.effect';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AppComponent } from './components/app-root/app.component';
import { Ng5SliderModule } from 'ng5-slider';
import { FishService } from './services/fish.service';
import { SharedModule } from './modules/SharedModule/shared.module';
import { AuthReducer } from './store/auth/auth.reducer';
import { NotificationService } from './services/notification.service';
import { ParameterEffects } from './store/parameter/parameter.effect';
import { parameterReducer } from './store/parameter/parameter.reducer';
import { HomeNavComponent } from './modules/CoreModule/components/home/home/home-nav/home-nav.component';
import { CoreModule } from './modules/CoreModule/core.module';




/* TODO - Make this look how we want it
-- Only import modules and route to individual modules
*/

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [
  ],

  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,

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
    BrowserAnimationsModule,
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
    ReactiveFormsModule,
    ColorPickerModule,
    FontAwesomeModule,
    Ng5SliderModule,

    CKEditorModule,

    StoreModule.forRoot({}),
    StoreModule.forFeature('aquariums', aquariumReducer),
    StoreModule.forFeature('snapshots', snapshotReducer),
    StoreModule.forFeature('species', speciesReducer),
    StoreModule.forFeature('fish', fishReducer),
    StoreModule.forFeature('profile', ProfileReducer),
    StoreModule.forFeature('post', PostReducer),
    StoreModule.forFeature('auth', AuthReducer),
    StoreModule.forFeature('parameter', parameterReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot([AquariumEffects, SnapshotEffects, SpeciesEffects, FishEffects, ProfileEffects, PostEffects,ParameterEffects]),
  ],
  providers: [
    AquariumService,
    FishService,
    AuthService,
    AdminService,
    AuthGuard,
    NotificationService,
    //Providers for authenticaion
    { provide: HTTP_INTERCEPTORS, useClass: AquariumInterceptor, multi: true },
    //{ provide: 'OAuth.Environment', useValue: environment.environmentTag },
    //{ provide: 'OAuth.ClientName', useValue: environment.appName },
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

