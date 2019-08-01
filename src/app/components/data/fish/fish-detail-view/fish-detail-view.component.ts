import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getAllSpecies, isUpdatingSpecies, getSpeciesUpdateError, isCreatingSpecies, isDeletingSpecies, getSpeciesDeleteError } from 'src/app/store/species/species.selector';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Species } from 'src/app/models/Species';
import { SpeciesLoadAction, SpeciesUpdateAction, SpeciesAddAction, SpeciesDeleteAction } from 'src/app/store/species/species.actions';
import { faPenFancy, faPen, faTrash,faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { NotifierService } from 'angular-notifier';
import { MatDialog } from '@angular/material';
import { ScraperModalComponent } from '../../../shared/modals/scraper-modal/scraper-modal.component';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from '../../../shared/modals/confirm-modal/confirm-modal.component';
import { Aquarium } from 'src/app/models/Aquarium';
import { Fish } from 'src/app/models/Fish';



@Component({
    selector: 'fish-detail-view',
    templateUrl: './fish-detail-view.component.html',
    styleUrls: ['./fish-detail-view.component.scss']
})
export class FishDetailViewComponent implements OnInit {
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


    constructor(private store: Store<AppState>, private notifier: NotifierService, private dialog: MatDialog, private router: Router) {

    }
    ngOnInit() {
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
        var dialog = this.dialog.open(ConfirmModalComponent, {
        });
        dialog.componentInstance.title = "Delete Species";
        dialog.componentInstance.body = "Are you sure you want to delete this species? This action is permanent.";
        dialog.afterClosed().pipe(take(1)).subscribe((confirm: boolean) => {
            if (confirm) {
                var deleting = true;
                this.exists = false;
                this.store.dispatch(new SpeciesDeleteAction(this.species));
                this.deleteError$.pipe(take(2)).subscribe(err => {
                    if (err && deleting) {
                        deleting = false;
                        this.notifier.notify("error", "Unable to add new species");
                        this.exists = true;
                        console.log(err);
                    }
                })
                this.deleting$.pipe(take(2)).subscribe(val => {
                    if (!val && deleting) {
                        this.notifier.notify("success", "Species was removed successfully");
                        this.router.navigate(['']); //todo species listing?
                    }
                });
            }
        });
    }
    clickScrape() {
        var dialog = this.dialog.open(ScraperModalComponent, {
            width: "40%",
            height: "40%"
        });
        dialog.componentInstance.originalSpecies = this.species;
        dialog.afterClosed().pipe(take(1)).subscribe((species: Species) => {
            for (var key in species) {
                var val = species[key];
                if (val) this.species[key] = val;
            }
        });
    }
    clickFeedFish() {
        
    }

    getFishAge()
    {
        return Math.floor((Date.now() - new Date(this.fish.date).getTime()) / 1000 / 60 / 60 / 24);
    }
}