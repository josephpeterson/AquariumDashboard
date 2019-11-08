import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getAllSpecies, isUpdatingSpecies, getSpeciesUpdateError, isCreatingSpecies, isDeletingSpecies, getSpeciesDeleteError } from 'src/app/store/species/species.selector';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Species } from 'src/app/models/Species';
import { SpeciesLoadAction, SpeciesUpdateAction, SpeciesAddAction, SpeciesDeleteAction } from 'src/app/store/species/species.actions';
import { faPenFancy, faPen, faTrash, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { NotifierService } from 'angular-notifier';
import { MatDialog } from '@angular/material';
import { ScraperModalComponent } from '../../../shared/modals/scraper-modal/scraper-modal.component';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from '../../../shared/modals/confirm-modal/confirm-modal.component';
import { Aquarium } from 'src/app/models/Aquarium';
import { Fish } from 'src/app/models/Fish';
import * as moment from 'moment';
import { FishFeedModalComponent } from 'src/app/components/shared/modals/fish-feed-modal/fish-feed-modal.component';
import { AquariumService } from 'src/app/services/aquarium.service';



@Component({
    selector: 'fish-card',
    templateUrl: './fish-card.component.html',
    styleUrls: ['./fish-card.component.scss']
})
export class FishCardComponent implements OnInit {
    @Input("fish") fish: Fish;
    @Input("aquarium") aquarium: Aquarium;


    //public fish: Fish = new Fish();

    public exists = false;
    public editing = false;
    public adding = false;
    public added = false;
    public species: Species = new Species();
    public species$ = this.store.select(getAllSpecies);
    public componentLifecycle = new Subject();

    public updating$ = this.store.select(isUpdatingSpecies);
    public adding$ = this.store.select(isCreatingSpecies);
    public updateError$ = this.store.select(getSpeciesUpdateError);

    public deleting$ = this.store.select(isDeletingSpecies);
    public deleteError$ = this.store.select(getSpeciesDeleteError);

    faEdit = faPenFancy;
    faAngleRight = faAngleRight;
    faTrash = faTrash;
    private _matchedSpecies: Species;


    constructor(private store: Store<AppState>, private notifier: NotifierService, private dialog: MatDialog, private router: Router,private _aquariumService: AquariumService) {

    }
    ngOnInit() {
    }

    ngOnDestory() {
        this.componentLifecycle.next();
        this.componentLifecycle.unsubscribe();
    }
    clickFeedFish() {
        this.dialog.open(FishFeedModalComponent, {
            data: this.fish
        });
    }

    getFishAge() {
        return Math.floor((Date.now() - new Date(this.fish.date).getTime()) / 1000 / 60 / 60 / 24);
    }
    getReadableDate(date) {
        return moment().diff(date, "days");
    }
    getFishThumbnailSource(fish: Fish) {
        var val = this._aquariumService.getPhotoPermalink(fish.thumbnailPhotoId, "1");
        return val;
    }
}