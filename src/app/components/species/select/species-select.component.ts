import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Species } from 'src/app/models/Species';
import { select, Store } from '@ngrx/store';
import { getAllSpecies } from 'src/app/store/species/species.selector';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'species-select',
    templateUrl: './species-select.component.html',
    styleUrls: ['./species-select.component.scss'],
})
export class SpeciesSelectComponent {
    public availableSpecies: Species[] = [];

    public species$ = this.store.pipe(select(getAllSpecies));
    public componentLifeCycle$ = new Subject();

    public selectControl: FormControl = new FormControl();

    @Output() onChange = new EventEmitter();
    @Input() value: Species;

    constructor(private store: Store<AppState>) {
    }
    ngOnInit() {
        this.selectControl.valueChanges.pipe(takeUntil(this.componentLifeCycle$)).subscribe(val => {
            this.onChange.emit(val);
        });
        this.species$.pipe(takeUntil(this.componentLifeCycle$)).subscribe(species => {
            if (!species) return;
            this.availableSpecies = species;
        })
        this.selectControl.setValue(this.value);
    }
    ngOnDestory() {
        this.componentLifeCycle$.next();
        this.componentLifeCycle$.unsubscribe();
    }
}