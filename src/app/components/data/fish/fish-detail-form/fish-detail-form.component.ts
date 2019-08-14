import * as moment from 'moment';
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
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumLoadSuccessAction } from 'src/app/store/aquarium/aquarium.actions';
import { FishPhotoModal } from 'src/app/components/shared/modals/fish-photo-modal/fish-photo-modal.component';
import { FishPhoto } from 'src/app/models/FishPhoto';
import { PhotoExpandedModalComponent } from 'src/app/components/shared/modals/photo-expanded-modal/photo-expanded-modal.component';



@Component({
    selector: 'fish-detail-form',
    templateUrl: './fish-detail-form.component.html',
    styleUrls: ['./fish-detail-form.component.scss']
})
export class FishDetailFormComponent implements OnInit {
    @Input("fish") fish: Fish;
    @Input("aquarium") aquarium: Aquarium;


    //public fish: Fish = new Fish();

    public disabled: boolean;

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


    constructor(private store: Store<AppState>, private notifier: NotifierService, private dialog: MatDialog, private router: Router,
        private _aquariumService: AquariumService) {

    }
    ngOnInit() {
        if (this.fish.aquarium && !this.aquarium) //maybe remove this logic
            this.aquarium = this.fish.aquarium;
    }

    ngOnDestory() {
        this.componentLifecycle.next();
        this.componentLifecycle.unsubscribe();
    }

    clickEdit() {
        this.editing = true;
    }
    clickCancel() {
        this.editing = false;
    }
    clickReset() {
        //this.editing = true;
        this.species = new Species(this._matchedSpecies);
    }
    clickSave() {
        //this.editing = true;

        var updating = true;
        this.store.dispatch(new SpeciesUpdateAction(this.species));
        this.updateError$.pipe(take(2)).subscribe(err => {
            if (err && updating) {
                updating = false;
                this.notifier.notify("error", "Unable to update species");
                console.log(err);
            }
        })
        this.updating$.pipe(take(2)).subscribe(val => {
            if (!val && updating) {
                this.notifier.notify("success", "Species updated");
                this.editing = false;
            }
        });
    }
    clickAdd() {
        var adding = true;
        this.store.dispatch(new SpeciesAddAction(this.species));
        this.updateError$.pipe(take(2)).subscribe(err => {
            if (err && adding) {
                adding = false;
                this.notifier.notify("error", "Unable to add new species");
                console.log(err);
            }
        })
        this.adding$.pipe(take(2)).subscribe(val => {
            if (!val && adding) {
                this.notifier.notify("success", "Species added");
                this.editing = false;
                this.adding = false;
                this.added = true;
                this.store.dispatch(new SpeciesLoadAction());
                //this.router.navigate([val.id]);
            }
        });
    }
    clickDelete() {
        this.disabled = true;
        var dialog = this.dialog.open(ConfirmModalComponent, {
        });
        dialog.componentInstance.title = "Delete Fish";
        dialog.componentInstance.body = "Are you sure you want to delete this fish? The fish as well as any associated information will be permanently removed. This action is not recoverable.";
        dialog.afterClosed().pipe(take(1)).subscribe((confirm: boolean) => {
            if (confirm) {
                this._aquariumService.deleteFish(this.fish).subscribe(fish => {
                    this.fish = fish;
                    this.store.dispatch(new AquariumLoadSuccessAction([this.aquarium]));
                    this.disabled = false;
                }, err => {
                    this.notifier.notify("error", "Could not delete fish");
                    this.disabled = false;
                });
            }
        });
    }
    clickUploadPhoto() {
        var dialog = this.dialog.open(FishPhotoModal, {
        });
        dialog.componentInstance.fishId = this.fish.id;
        //todo replace this by store
        dialog.afterClosed().subscribe(photo => {
            if (photo) {
                this.fish.photos.push(photo);
            }
        });
    }
    getFishAge() {
        return moment().diff(this.fish.date, "days");
    }

    getFishPhotoSource(photoId: number) {
        return this._aquariumService.getFishPhotoPermalink(photoId);
    }
    public clickFishPhoto(photo: FishPhoto) {
        var dialog = this.dialog.open(PhotoExpandedModalComponent, {
            panelClass: "darkDialog",
        });
        dialog.componentInstance.fishPhoto = photo;
    }
}

