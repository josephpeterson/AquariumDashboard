import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getAllSpecies, isDeletingSpecies, getSpeciesDeleteError } from 'src/app/store/species/species.selector';
import { Subject, Observable } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Species } from 'src/app/models/Species';
import { faTrash, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { MatDialog } from '@angular/material/dialog';
import { Aquarium } from 'src/app/models/Aquarium';
import { Fish } from 'src/app/models/Fish';
import { FishUpdateAction, FishDeleteAction } from 'src/app/store/fish/fish.actions';
import { getSelectedFish, isUpdatingFish, isCreatingFish, getFishUpdateError } from 'src/app/store/fish/fish.selector';
import { NotificationService } from 'src/app/services/notification.service';
import { ConfirmModalComponent } from '../../SharedDeviceModule/components/modals/confirm-modal/confirm-modal.component';



@Component({
    selector: 'fish-edit-view',
    templateUrl: './fish-edit-view.component.html',
    styleUrls: ['./fish-edit-view.component.scss']
})
export class FishEditViewComponent implements OnInit {
    @Input("fish") fish: Fish;
    @Input("aquarium") aquarium: Aquarium;

    public fish$: Observable<Fish> = this.store.select(getSelectedFish);

    public disabled: boolean;

    public exists = false;
    public editing = false;
    public adding = false;
    public added = false;
    public species: Species = new Species();
    public species$ = this.store.select(getAllSpecies);
    public componentLifecycle = new Subject();

    public updating$ = this.store.select(isUpdatingFish);
    public adding$ = this.store.select(isCreatingFish);
    public updateError$ = this.store.select(getFishUpdateError);

    public deleting$ = this.store.select(isDeletingSpecies);
    public deleteError$ = this.store.select(getSpeciesDeleteError);

    faAngleRight = faAngleRight;
    faTrash = faTrash;


    constructor(private store: Store<AppState>, private notifier: NotificationService, private dialog: MatDialog) {

    }
    ngOnInit() {

        this.fish$.pipe(takeUntil(this.componentLifecycle)).subscribe(fish => {
            if (fish)
                this.fish = { ...fish };
        });
    }
    ngOnDestory() {
        this.componentLifecycle.next();
        this.componentLifecycle.unsubscribe();
    }




    clickReset() {
        this.fish$.pipe(take(1)).subscribe(fish => this.fish = { ...fish });
    }
    clickSave() {
        console.log(this.fish);
        var updating = true;
        this.store.dispatch(new FishUpdateAction(this.fish));
        this.updateError$.pipe(take(2)).subscribe(err => {
            if (err && updating) {
                updating = false;
                this.notifier.notify("error", "Unable to update fish");
                console.log(err);
            }
        })
        this.updating$.pipe(take(2)).subscribe(val => {
            if (!val && updating) {
                this.notifier.notify("success", "Fish updated");
                this.editing = false;
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
                this.store.dispatch(new FishDeleteAction(this.fish));
            }
        });
    }
}

