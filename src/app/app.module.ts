import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//ngRx Store support
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { aquariumReducer } from './store/aquarium/aquarium.reducer';
import { snapshotReducer } from './store/snapshot/snapshot.reducer';
import { speciesReducer } from './store/species/species.reducer';

import { AppRoutingModule } from './app-routing.module';

import { MatDatepickerModule } from '@angular/material/datepicker';
//import { NotifierModule } from 'angular-notifier';
import { fishReducer } from './store/fish/fish.reducer';

import { AquariumInterceptor } from './services/aquarium.interceptor';
import { AquariumService } from './services/aquarium.service';
import { AuthGuard } from './guards/AuthGuard';
import { AuthService } from './services/auth.service';

import { AdminService } from './services/admin.service';
import { ProfileReducer } from './store/profile/profile.reducer';
import { PostReducer } from './store/post/post.reducer';
import { AppComponent } from './app.component';
import { FishService } from './services/fish.service';
import { AuthReducer } from './store/auth/auth.reducer';
import { NotificationService } from './services/notification.service';
import { parameterReducer } from './store/parameter/parameter.reducer';
import { CoreModule } from './modules/CoreModule/core.module';
import { AquariumEffects } from './store/aquarium/aquarium.effect';
import { FishEffects } from './store/fish/fish.effect';
import { ParameterEffects } from './store/parameter/parameter.effect';
import { SpeciesEffects } from './store/species/species.effect';
import { ProfileEffects } from './store/profile/profile.effect';
import { PostEffects } from './store/post/post.effect';
import { SnapshotEffects } from './store/snapshot/snapshot.effect';
import { ToastrModule } from 'ngx-toastr';




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


    ToastrModule.forRoot(),
    StoreModule.forRoot({}),
    StoreModule.forFeature('aquariums', aquariumReducer),
    StoreModule.forFeature('snapshots', snapshotReducer),
    StoreModule.forFeature('species', speciesReducer),
    StoreModule.forFeature('fish', fishReducer),
    StoreModule.forFeature('profile', ProfileReducer),
    StoreModule.forFeature('post', PostReducer),
    StoreModule.forFeature('auth', AuthReducer),
    StoreModule.forFeature('parameter', parameterReducer),
    EffectsModule.forRoot([AquariumEffects,FishEffects,ParameterEffects,SpeciesEffects,ProfileEffects,SnapshotEffects,PostEffects]),
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

