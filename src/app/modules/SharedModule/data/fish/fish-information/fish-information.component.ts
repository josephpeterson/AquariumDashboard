import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getAllSpecies, getSpeciesCreateError, getSpeciesUpdateError, isCreatingSpecies, isUpdatingSpecies, getSpeciesDeleteError, isDeletingSpecies } from 'src/app/store/species/species.selector';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Species } from 'src/app/models/Species';

import { SpeciesAddAction, SpeciesUpdateAction, SpeciesDeleteAction } from 'src/app/store/species/species.actions';
import { Fish } from 'src/app/models/Fish';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'fish-information',
    templateUrl: './fish-information.component.html',
    styleUrls: ['./fish-information.component.scss']
})
export class FishInformationComponent implements OnInit {
    @Input("fishId") fishId;

    @Output() onSuccess = new EventEmitter();

    public exists = false;

    public fish: Fish;

    public species: Species = new Species();

    public species$ = this.store.select(getAllSpecies);

    public addError$ = this.store.select(getSpeciesCreateError);
    public updateError$ = this.store.select(getSpeciesUpdateError);
    public deleteError$ = this.store.select(getSpeciesDeleteError);

    public adding$ = this.store.select(isCreatingSpecies);
    public updating$ = this.store.select(isUpdatingSpecies);
    public deleting$ = this.store.select(isDeletingSpecies);

    public componentLifecycle = new Subject();


    constructor(private store: Store<AppState>, private notifier: NotificationService) {

    }
    ngOnInit() {
        this.mock();
    }

    ngOnDestory() {
        this.componentLifecycle.next();
        this.componentLifecycle.unsubscribe();
    }

    mock() {
        var f = new Fish();
        this.fish = f;

        f.name = "Gray Molly";
        f.description = "this is a description test. this is a description test. this is a description test. this is a description test. this is a description test. this is a description test. this is a description test. this is a description test. ";
    }
}