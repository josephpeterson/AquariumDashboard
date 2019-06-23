import { Aquarium } from 'src/app/models/Aquarium';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getSelectedAquarium, isCreatingFish, getFishCreateError, getAquariumById, isDeletingFish, getFishDeleteError, getFishUpdateError, isUpdatingFish } from 'src/app/store/aquarium/aquarium.selector';
import { FormControl } from '@angular/forms';
import { AppState } from 'src/app/app.state';
import { getAllSpecies } from 'src/app/store/species/species.selector';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Species } from 'src/app/models/Species';
import { Fish } from 'src/app/models/Fish';
import { AquariumAddFishAction, AquariumLoadByIdAction, AquariumDeleteAction, AquariumDeleteFishAction, AquariumUpdateFishAction } from 'src/app/store/aquarium/aquarium.actions';
import { NotifierService } from 'angular-notifier';

@Component({
    selector: 'feeding-detail-form',
    templateUrl: './feeding-detail-form.component.html',
    styleUrls: ['./feeding-detail-form.component.scss']
})
export class FeedingDetailFormComponent implements OnInit {
    public aquarium: Aquarium;
    public availableSpecies: Species[] = [];


    @Input() fishId: number;
    @Input() aquariumId: number;
    @Input() speciesId: number;

    @Output() public onSuccess = new EventEmitter();

    public aquarium$;
    public exists: boolean = false;
    public fish: Fish = new Fish();

    public adding$ = this.store.select(isCreatingFish);
    public addError$ = this.store.select(getFishCreateError);
    public deleting$ = this.store.select(isDeletingFish);
    public deleteError$ = this.store.select(getFishDeleteError);
    public updating$ = this.store.select(isUpdatingFish);
    public updateError$ = this.store.select(getFishUpdateError);

    public species$ = this.store.pipe(select(getAllSpecies));
    public componentLifeCycle$ = new Subject();

    public newFish: Fish = new Fish();

    constructor(private store: Store<AppState>, private notifier: NotifierService) {
        this.fish.date = new Date(); //default date
    }
    ngOnInit() {
        this.loadAquarium(this.aquariumId);
    }

    loadAquarium(id: number) {
        this.store.dispatch(new AquariumLoadByIdAction(id));
        this.aquarium$ = this.store.select(getAquariumById, this.aquariumId);
        this.aquarium$.pipe(takeUntil(this.componentLifeCycle$)).subscribe(aq => {
            if (!aq) return;
            this.exists = false;
            this.aquarium = aq;
            if (aq.fish)
                aq.fish.forEach(f => {
                    if (f.id == this.fishId) {
                        this.exists = true;
                        this.setFish(f);
                    }
                })
        })
    }
    setFish(fish: Fish) {
        this.fish = Object.assign({}, fish);
        this.species$.pipe(take(2)).subscribe(species => {
            if (!species) return;
            species.forEach(s => {
                if (s.id == this.fish.speciesId)
                    this.fish.species = s;
            });
        });
    }
    ngOnDestory() {
        this.componentLifeCycle$.next();
        this.componentLifeCycle$.unsubscribe();
    }

    clickCreateFish() {
        var newFish = this.fish;
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
            if (!val && adding) {
                this.notifier.notify("success", "Added fish to aquarium.");
                this.actionSuccess();
            }
        });
    }
    clickDeleteFish() {
        var deleting = true;
        this.store.dispatch(new AquariumDeleteFishAction(this.fish));
        this.deleteError$.pipe(take(2)).subscribe(err => {
            if (err && deleting) {
                deleting = false;
                this.notifier.notify("error", "Could not remove fish from aquarium.");
                console.log(err);
            }
        })
        this.deleting$.pipe(take(2)).subscribe(val => {
            if (!val && deleting) {
                this.notifier.notify("success", "Successfully deleted this fish from the aquarium.");
                this.actionSuccess();
            }
        });
    }
    clickUpdateFish() {
        var updating = true;
        this.store.dispatch(new AquariumUpdateFishAction(this.fish));
        this.updateError$.pipe(take(2)).subscribe(err => {
            if (err && updating) {
                updating = false;
                this.notifier.notify("error", "Could not update fish.");
                console.log(err);
            }
        })
        this.updating$.pipe(take(2)).subscribe(val => {
            if (val && updating) {
                this.notifier.notify("success", "Successfully updated fish information.");
                this.actionSuccess();
            }
        });
    }


    selectSpecies(species: Species) {
        if (species) {
            this.fish.speciesId = species.id
            this.fish.species = species;
        }
        else
            this.fish.speciesId = null;
    }
    selectAquarium(aquarium: Aquarium) {
        if (aquarium) {
            this.fish.aquariumId = aquarium.id
            this.fish.aquarium = aquarium;
        }
        else
            this.fish.aquariumId = null;
    }

    actionSuccess() {
        this.onSuccess.emit();
    }
}