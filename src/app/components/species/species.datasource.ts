import { MatTableDataSource } from '@angular/material/table';
import { getAquariumFish, isLoadingAquariums, getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { Injectable } from '@angular/core';
import { Fish } from 'src/app/models/Fish';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { takeUntil, take } from 'rxjs/operators';
import { Aquarium } from 'src/app/models/Aquarium';
import { SpeciesLoadAction } from 'src/app/store/species/species.actions';
import { Species } from 'src/app/models/Species';
import { isLoadingSpecies, getAllSpecies } from 'src/app/store/species/species.selector';

@Injectable({
    providedIn: "root"
})
export class SpeciesDataSource extends MatTableDataSource<SpeciesTableItem> {
    public loading$: Observable<Boolean> = this.store.select(isLoadingSpecies);
    public species$: Observable<Species[]> = this.store.select(getAllSpecies);
    public componentLifeCycle = new Subject();

    constructor(private store: Store<AppState>) {
        super();
        this.species$.pipe(takeUntil(this.componentLifeCycle)).subscribe(species => {
            this.data = species.map(s => new SpeciesTableItem(s));
        });
        this.load();
    }
    load() {
        this.store.select(isLoadingSpecies).pipe(take(1)).subscribe(val => {
            if (!val) this.store.dispatch(new SpeciesLoadAction());
        });
    }
    ngOnDestroy() {
        this.componentLifeCycle.next();
        this.componentLifeCycle.unsubscribe();
    }
}
export class SpeciesTableItem extends Species {
    public phRange: string
    public tempRange: string
    public allColors: string

    constructor(private source: Species) {
        super();
        Object.assign(this, source);
        if (this.phMin && this.phMax)
            this.phRange = `${this.phMin} - ${this.phMax}`;
        if (this.temperatureMin && this.temperatureMax)
            this.tempRange = `${this.temperatureMin} - ${this.temperatureMax}F`;
        this.allColors = this.primaryColor;
        if(this.secondaryColor && this.primaryColor)
            this.allColors += ", " + this.secondaryColor;
        else if(this.secondaryColor)
            this.allColors = this.secondaryColor;
    }
}