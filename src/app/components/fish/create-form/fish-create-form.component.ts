import { Aquarium } from 'src/app/models/Aquarium';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getSelectedAquarium, isCreatingFish, getFishCreateError } from 'src/app/store/aquarium/aquarium.selector';
import { FormControl } from '@angular/forms';
import { AppState } from 'src/app/app.state';
import { getAllSpecies } from 'src/app/store/species/species.selector';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Species } from 'src/app/models/Species';
import { Fish } from 'src/app/models/Fish';
import { AquariumAddFishAction } from 'src/app/store/aquarium/aquarium.actions';
import { NotifierService } from 'angular-notifier';

@Component({
    selector: 'fish-create-form',
    templateUrl: './fish-create-form.component.html',
    styleUrls: ['./fish-create-form.component.scss']
})
export class FishCreateFormComponent implements OnInit {
    public aquarium: Aquarium;
    public availableSpecies: Species[] = [];


    public aquarium$ = this.store.pipe(select(getSelectedAquarium));
    public adding$ = this.store.select(isCreatingFish);
    public addError$ = this.store.select(getFishCreateError);

    public species$ = this.store.pipe(select(getAllSpecies));
    public componentLifeCycle$ = new Subject();

    public newFish: Fish = new Fish();

    constructor(private store: Store<AppState>, private notifier: NotifierService) {

    }
    ngOnInit() {
        this.newFish.date = new Date();
        this.aquarium$.pipe(takeUntil(this.componentLifeCycle$)).subscribe(aq => {
            if (!aq) return;
            this.aquarium = aq;
            this.newFish.aquariumId = aq.id;
        })
        this.species$.pipe(takeUntil(this.componentLifeCycle$)).subscribe(species => {
            if (!species) return;
            this.availableSpecies = species;
        })
    }
    ngOnDestory() {
        this.componentLifeCycle$.next();
        this.componentLifeCycle$.unsubscribe();
    }

    clickCreateFish() {
        var newFish = this.newFish;
        this.store.dispatch(new AquariumAddFishAction(newFish));
        this.addError$.pipe(take(2)).subscribe(err => {
            if (err) {
                adding = false;
                this.notifier.notify("error", "Unable to add fish to aquarium.");
                console.log(err);
            }
        })
        var adding = true;
        this.adding$.pipe(take(2)).subscribe(val => {
            if (!val && adding) this.notifier.notify("success", "Added fish to aquarium.");
        });
    }
    selectSpecies(species: Species) {
        if (species)
            this.newFish.speciesId = species.id
        else
            this.newFish.speciesId = null;
    }
    selectAquarium(aquarium: Aquarium) {
        if (aquarium)
            this.newFish.aquariumId = aquarium.id
        else
            this.newFish.aquariumId = null;
    }
}