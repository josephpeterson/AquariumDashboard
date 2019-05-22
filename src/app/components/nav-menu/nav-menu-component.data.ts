import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumListAction, AquariumSelectionAction } from 'src/app/store/aquarium/aquarium.actions';
import { Aquarium } from 'src/app/models/Aquarium';
import { Injectable } from '@angular/core';
import { getAllAquariums, isLoadingAquariums, getConnectionError, getSelectedAquarium, hasValidAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: "root"
})
export class NavMenuComponentData {
    public aquarium = this.store.select(getSelectedAquarium);
    public aquariums = this.store.pipe(select(getAllAquariums));
    public loading = this.store.select(isLoadingAquariums);
    public connectionError = this.store.select(getConnectionError);
    public hasValidAquarium = this.store.select(hasValidAquarium);
  
    constructor(private store: Store<AppState>){}


    load(aquariumId: number) {
        this.select(aquariumId);
        this.store.dispatch(new AquariumListAction());
    }
    select(aquariumId:number) {
        this.store.dispatch(new AquariumSelectionAction(aquariumId));
    }
}