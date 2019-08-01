import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Injectable } from '@angular/core';
import { getAllAquariums, isLoadingAquariums, getConnectionError, getSelectedAquarium, getAquariumWasCreated, getAquariumCreateError, isCreatingAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumCreateAction, AquariumCreateResetAction } from 'src/app/store/aquarium/aquarium.actions';
@Injectable({
  providedIn: "root"
})
export class CreateAquariumModalComponentData {
    public aquarium = this.store.pipe(select(getSelectedAquarium));
    public aquariums = this.store.pipe(select(getAllAquariums));
    public loading = this.store.select(isCreatingAquarium);
    public connectionError = this.store.select(getConnectionError);
    public wasCreated = this.store.select(getAquariumWasCreated);
    public createError = this.store.select(getAquariumCreateError);
  
    constructor(private store: Store<AppState>) { }

    create(aquarium:Aquarium) {
        this.store.dispatch(new AquariumCreateAction(aquarium));
    }
    reset() {
      this.store.dispatch(new AquariumCreateResetAction());
    }
}