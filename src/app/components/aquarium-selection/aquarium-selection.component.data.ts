import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumListAction, AquariumSelectionAction } from 'src/app/store/aquarium/aquarium.actions';
import { Aquarium } from 'src/app/models/Aquarium';
import { Injectable } from '@angular/core';
import { getAllAquariums, isLoadingAquariums, getConnectionError, getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
@Injectable({
  providedIn: "root"
})
export class AquariumSelectionComponentData {
    public aquarium = this.store.pipe(select(getSelectedAquarium));
    public aquariums = this.store.pipe(select(getAllAquariums));
    public loading = this.store.select(isLoadingAquariums);
    public connectionError = this.store.select(getConnectionError);
  
    constructor(private store: Store<AppState>) { }

    load() {
        this.store.dispatch(new AquariumListAction());
    }
    select(aquarium:Aquarium) {
        this.store.dispatch(new AquariumSelectionAction(aquarium.id));
    }
}