import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Species } from 'src/app/models/Species';
import { select, Store } from '@ngrx/store';
import { getAllSpecies } from 'src/app/store/species/species.selector';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ManageSpeciesModalComponent } from '../../../shared/modals/manage-species-modal/manage-species-modal.component';
import { Fish } from 'src/app/models/Fish';
import { SpeciesLoadAction } from 'src/app/store/species/species.actions';

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
    @Input() fish: Fish;

    constructor(private store: Store<AppState>,private dialog:MatDialog) {
    }
    ngOnInit() {
        this.selectControl.valueChanges.pipe(takeUntil(this.componentLifeCycle$)).subscribe(val => {
            if(this.fish && val) //remove this check? (make fish input required?)
                this.fish.speciesId = val.id;
            this.onChange.emit(val);
        });
        var loading = false;
        this.species$.pipe(takeUntil(this.componentLifeCycle$)).subscribe(species => {
            if (species.length == 0 && !loading) {
                loading = true;
                this.store.dispatch(new SpeciesLoadAction());
            }
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