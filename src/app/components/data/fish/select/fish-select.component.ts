import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Species } from 'src/app/models/Species';
import { select, Store } from '@ngrx/store';
import { getAllSpecies } from 'src/app/store/species/species.selector';
import { Subject, Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ManageSpeciesModalComponent } from '../../../modals/manage-species-modal/manage-species-modal.component';
import { Fish } from 'src/app/models/Fish';
import { getAquariumById, getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumLoadByIdAction } from 'src/app/store/aquarium/aquarium.actions';

@Component({
    selector: 'fish-select',
    templateUrl: './fish-select.component.html',
    styleUrls: ['./fish-select.component.scss'],
})
export class FishSelectComponent {
    public availableFish: Fish[] = [];

    public componentLifeCycle$ = new Subject();

    public selectControl: FormControl = new FormControl();

    @Output() onChange = new EventEmitter();
    @Input() aquariumId: number;
    @Input() value: number;

    public aquarium$: Observable<Aquarium>;

    constructor(private store: Store<AppState>,private dialog:MatDialog) {
    }
    ngOnInit() {
        this.store.dispatch(new AquariumLoadByIdAction(this.aquariumId)); //todo add a check to prevent this maybe
        this.selectControl.valueChanges.pipe(takeUntil(this.componentLifeCycle$)).subscribe(val => {
            this.onChange.emit(val);
        });
        this.selectControl.setValue(this.value);

        
        this.aquarium$ = this.store.select(getAquariumById,this.aquariumId);
        this.aquarium$.pipe(takeUntil(this.componentLifeCycle$)).subscribe(aquarium => {
            if (!aquarium) return;
            this.availableFish = aquarium.fish;
        })
    }
    ngOnDestory() {
        this.componentLifeCycle$.next();
        this.componentLifeCycle$.unsubscribe();
    }
    openFishManager() {

    }
}