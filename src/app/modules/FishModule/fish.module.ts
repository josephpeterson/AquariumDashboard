//this is modelled from your app.module.ts and the components and 
//services are just arbitrary examples, your module might be different
import { NgModule } from '@angular/core';
import { AquariumService } from '../../services/aquarium.service';
import { FishService } from '../../services/fish.service';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
import { AuthGuard } from '../../guards/AuthGuard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AquariumInterceptor } from '../../services/aquarium.interceptor';
import { MatDatepickerModule } from '@angular/material';
import { FishContainer } from '../../components/containers/FishContainer/fish-container.component';
import { FishPhotosComponent } from '../../components/containers/AquariumContainer/photos/fish/fish-photos.component';
import { FishDetailViewComponent } from '../../components/containers/FishContainer/fish-detail-view/fish-detail-view.component';
import { FishEditViewComponent } from '../../components/containers/FishContainer/fish-edit-view/fish-edit-view.component';


@NgModule({
  imports: [

  ],
  declarations: [
    FishContainer,
    FishPhotosComponent,
    FishDetailViewComponent,
    FishEditViewComponent,
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
export class FishModule { }