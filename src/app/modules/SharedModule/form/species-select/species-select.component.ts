import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Species } from 'src/app/models/Species';
import { select, Store } from '@ngrx/store';
import { getAllSpecies } from 'src/app/store/species/species.selector';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Fish } from 'src/app/models/Fish';
import { SpeciesLoadAction } from 'src/app/store/species/species.actions';
import { CreateSpeciesModalComponent } from '../../modals/create-species-modal/create-species-modal.component';

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
    //@Input() value: Species;
    @Input() fish: Fish;

    constructor(private store: Store<AppState>,private dialog:MatDialog) {
    }
    ngOnInit() {
        this.selectControl.valueChanges.pipe(takeUntil(this.componentLifeCycle$)).subscribe(val => {
            if(this.fish && val) //remove this check? (make fish input required?)
            {
                this.fish.speciesId = val.id;
                this.fish.species = val;
            }
            this.onChange.emit(val);
        });
        var loading = false;
        this.species$.pipe(takeUntil(this.componentLifeCycle$)).subscribe(species => {
            if (species.length == 0 && !loading) {
                loading = true;
                this.store.dispatch(new SpeciesLoadAction());
            }
            this.availableSpecies = species;
            if(this.fish) {
                var s = species.filter(s => s.id == this.fish.speciesId)[0];
                this.selectControl.setValue(s);
            }
        })
        //this.selectControl.setValue(this.value);
    }
    ngOnDestory() {
        this.componentLifeCycle$.next();
        this.componentLifeCycle$.unsubscribe();
    }
    openNewSpecies() {
        var dialog = this.dialog.open(CreateSpeciesModalComponent, {
            //height: "80%",
            width: "60%"
          }).componentInstance;
    }
}