import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getAllSpecies } from 'src/app/store/species/species.selector';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Species } from 'src/app/models/Species';

@Component({
    selector: 'species-detail-view',
    templateUrl: './species-detail-view.component.html',
    styleUrls: ['./species-detail-view.component.scss']
})
export class SpeciesDetailViewComponent implements OnInit {
    @Input("speciesId") speciesId;
    public exists = false;
    public species: Species = new Species();
    public species$ = this.store.select(getAllSpecies);
    public componentLifecycle = new Subject();
    

    constructor(private store: Store<AppState>) {

    }
    ngOnInit() {
        this.species$.pipe(takeUntil(this.componentLifecycle)).subscribe(species => {
            if(this.speciesId)
            {
                species.forEach(s => {
                    if(s.id == this.speciesId)
                    {
                        this.species = s;
                        this.exists = true;
                    }
                });
            }
            else
                this.exists = false;
        });
    }

    ngOnDestory() {
        this.componentLifecycle.next();
        this.componentLifecycle.unsubscribe();
    }
}