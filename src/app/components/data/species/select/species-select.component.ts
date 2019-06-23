import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Species } from 'src/app/models/Species';
import { select, Store } from '@ngrx/store';
import { getAllSpecies } from 'src/app/store/species/species.selector';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ManageSpeciesModalComponent } from '../../../modals/manage-species-modal/manage-species-modal.component';

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

    constructor(private store: Store<AppState>,private dialog:MatDialog) {
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
    openSpeciesManager() {
        var dialog = this.dialog.open(ManageSpeciesModalComponent, {
            //height: "80%",
            width: "60%"
          }).componentInstance;
    }
}