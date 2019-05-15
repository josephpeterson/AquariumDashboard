import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumListAction, AquariumSelectionAction, AquariumUpdateAction } from 'src/app/store/aquarium/aquarium.actions';
import { Aquarium } from 'src/app/models/Aquarium';
import { Injectable } from '@angular/core';
import { isLoadingAquariums, getConnectionError, getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
@Injectable({
  providedIn: "root"
})
export class SettingsComponentData {
    public aquarium = this.store.select(getSelectedAquarium);
    public loading = this.store.select(isLoadingAquariums);
    public connectionError = this.store.select(getConnectionError);
  
    constructor(private store: Store<AppState>) { }


    load() {
        //this.store.dispatch(new AquariumLoadAction());
    }
    select(aquarium:Aquarium) {
        this.store.dispatch(new AquariumSelectionAction(aquarium.id));
    }
    save(aquarium:Aquarium) {
        this.store.dispatch(new AquariumUpdateAction(aquarium));
    }
}