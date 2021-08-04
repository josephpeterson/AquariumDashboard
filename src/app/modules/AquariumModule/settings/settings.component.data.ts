import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumUpdateAction, AquariumDeleteAction, AquariumResetAction } from 'src/app/store/aquarium/aquarium.actions';
import { Aquarium } from 'src/app/models/Aquarium';
import { Injectable } from '@angular/core';
import { isLoadingAquariums, getConnectionError, getSelectedAquarium, isUpdatingAquarium, isDeletingAquarium, getDeleteError, getDidDelete, getDidUpdate } from 'src/app/store/aquarium/aquarium.selector';
import { AquariumService } from 'src/app/services/aquarium.service';
import { CameraConfiguration } from 'src/app/models/CameraConfiguration';

import { take } from 'rxjs/operators';
@Injectable({
  providedIn: "root"
})
export class SettingsComponentData {
  public aquarium = this.store.select(getSelectedAquarium);
  public loading = this.store.select(isLoadingAquariums);
  public connectionError = this.store.select(getConnectionError);
  public updating = this.store.select(isUpdatingAquarium);
  public updated = this.store.select(getDidUpdate);
  public deleting = this.store.select(isDeletingAquarium);
  public deleted = this.store.select(getDidDelete);
  public deleteError = this.store.select(getDeleteError);

  public applicationLog = this.service.getApplicationLog();

  public cameraConfiguration = this.service.getCameraConfiguration();

  constructor(private store: Store<AppState>,private service: AquariumService,public notifier: NotificationService){
  }

  isDetailed(aq) {
    return aq.cameraConfiguration != undefined;
  }

  save(aquarium: Aquarium) {
    var err = false;

    this.updated.pipe(take(2)).subscribe(val => {
      if(val) this.notifier.notify('success',"Changes saved successfully");
    })
    this.store.dispatch(new AquariumUpdateAction(aquarium));
  }
  delete(aquarium: Aquarium) {
    this.store.dispatch(new AquariumDeleteAction(aquarium));
  }
  reset() {
    this.store.dispatch(new AquariumResetAction());
  }

  applyCameraConfiguration(configuration:CameraConfiguration) {
    return this.service.applyCameraConfiguration(configuration).subscribe();
  }
}