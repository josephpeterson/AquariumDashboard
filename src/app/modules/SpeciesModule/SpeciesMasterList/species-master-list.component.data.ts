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
import { Species } from 'src/app/models/Species';
import { isLoadingSpecies, getAllSpecies } from 'src/app/store/species/species.selector';

@Injectable({
    providedIn: "root"
})
export class SpeciesMasterListComponentData extends MatTableDataSource<Species> {
    public loading$: Observable<Boolean> = this.store.select(isLoadingSpecies);
    public species$: Observable<Species[]> = this.store.select(getAllSpecies);
    public componentLifeCycle = new Subject();

    constructor(private store: Store<AppState>) {
        super();
        this.species$.pipe(takeUntil(this.componentLifeCycle)).subscribe(species => {
            this.data = species;
        });
        //Load species store (it may not be loaded)
        this.store.dispatch(new SpeciesLoadAction());
    }
    ngOnDestroy() {
        this.componentLifeCycle.next();
        this.componentLifeCycle.unsubscribe();
    }
}