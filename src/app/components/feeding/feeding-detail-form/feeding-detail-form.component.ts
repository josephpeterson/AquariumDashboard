import { Aquarium } from 'src/app/models/Aquarium';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getSelectedAquarium, isCreatingFish, getFishCreateError, getAquariumById, isDeletingFish, getFishDeleteError, getFishUpdateError, isUpdatingFish } from 'src/app/store/aquarium/aquarium.selector';
import { FormControl } from '@angular/forms';
import { AppState } from 'src/app/app.state';
import { getAllSpecies } from 'src/app/store/species/species.selector';
import { Subject, Observable } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Species } from 'src/app/models/Species';
import { Fish } from 'src/app/models/Fish';
import { AquariumAddFishAction, AquariumLoadByIdAction, AquariumDeleteAction, AquariumDeleteFishAction, AquariumUpdateFishAction } from 'src/app/store/aquarium/aquarium.actions';
import { NotifierService } from 'angular-notifier';
import { AquariumFeeding } from 'src/app/models/AquariumFeeding';

@Component({
    selector: 'feeding-detail-form',
    templateUrl: './feeding-detail-form.component.html',
    styleUrls: ['./feeding-detail-form.component.scss']
})
export class FeedingDetailFormComponent implements OnInit {
    public newFeeding: AquariumFeeding;
    public exists: boolean;

    public distinctProducts = [];
    public distinctBrands = [];

    @Input() feedingId: number;
    @Input() aquariumId: number;
    @Input() fishId: number;
    @Output() public onSuccess = new EventEmitter();

    public aquarium$: Observable<Aquarium>;
    private componentLifeCycle$ = new Subject();

    constructor(private store: Store<AppState>, private notifier: NotifierService) {

    }
    ngOnInit() {
        this.newFeeding = new AquariumFeeding();
        this.newFeeding.date = new Date();
        this.exists = false;
        this.loadAquarium(this.aquariumId);
    }

    loadAquarium(id: number) {
        this.store.dispatch(new AquariumLoadByIdAction(id));
        this.aquarium$ = this.store.select(getAquariumById, this.aquariumId);
        this.aquarium$.pipe(take(2)).subscribe(aq => {
            if(!aq) return;
            //
            this.distinctBrands = [aq.id];
        })
    }
    setFeeding(feeding: AquariumFeeding) {
        this.newFeeding = Object.assign({}, feeding);
    }

    selectAquarium(aquarium: Aquarium) {
        if (aquarium) {
            this.loadAquarium(aquarium.id);
        }
    }
    selectFish(fish: Fish) {
        if (fish) {
            this.newFeeding.fishId = fish.id;
        }
    }


    ngOnDestory() {
        this.componentLifeCycle$.next();
        this.componentLifeCycle$.unsubscribe();
    }

    actionSuccess() {
        this.onSuccess.emit();
    }
}