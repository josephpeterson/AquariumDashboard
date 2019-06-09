import { MatTableDataSource } from '@angular/material/table';
import { getAquariumFish, isLoadingAquariums, getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { Injectable } from '@angular/core';
import { Fish } from 'src/app/models/Fish';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { takeUntil } from 'rxjs/operators';
import { Aquarium } from 'src/app/models/Aquarium';
import { SpeciesLoadAction } from 'src/app/store/species/species.actions';

@Injectable({
    providedIn: "root"
})
export class FishTableListComponentData extends MatTableDataSource<Fish> {

    public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);
    public loading$: Observable<Boolean> = this.store.select(isLoadingAquariums);
    public componentLifeCycle = new Subject();

    constructor(private store: Store<AppState>) {
        super();
        this.aquarium$.pipe(takeUntil(this.componentLifeCycle)).subscribe(aq => {
            if(!aq.fish) return
            console.log(aq);
            this.data = aq.fish;
        });
        //Load species store (it may not be loaded)
        this.store.dispatch(new SpeciesLoadAction());
    }
    ngOnDestroy() {
        this.componentLifeCycle.next();
        this.componentLifeCycle.unsubscribe();
    }
}