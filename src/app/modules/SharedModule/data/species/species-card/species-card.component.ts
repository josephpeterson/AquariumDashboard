import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Species } from 'src/app/models/Species';



@Component({
    selector: 'species-card',
    templateUrl: './species-card.component.html',
    styleUrls: ['./species-card.component.scss']
})
export class SpeciesCardComponent implements OnInit {
    @Input("species") species: Species;
    @Input("speciesId") speciesId: number;
    private componentLifecycle$ = new Subject();


    constructor() {

    }
    ngOnInit() {
        if(!this.species && this.speciesId)
        {
            console.log("todo","load species by id");
        }
    }

    ngOnDestory() {
        this.componentLifecycle$.next();
        this.componentLifecycle$.unsubscribe();
    }
}