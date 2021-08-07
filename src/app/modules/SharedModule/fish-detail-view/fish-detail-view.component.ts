import * as moment from 'moment';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getAllSpecies, isDeletingSpecies, getSpeciesDeleteError } from 'src/app/store/species/species.selector';
import { Subject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Species } from 'src/app/models/Species';
import { SpeciesLoadAction, SpeciesAddAction } from 'src/app/store/species/species.actions';
import { faTrash, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/modules/SharedModule/modals/confirm-modal/confirm-modal.component';
import { Aquarium } from 'src/app/models/Aquarium';
import { Fish } from 'src/app/models/Fish';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumLoadSuccessAction } from 'src/app/store/aquarium/aquarium.actions';
import { FishPhoto } from 'src/app/models/FishPhoto';
import { PhotoExpandedModalComponent } from 'src/app/modules/SharedModule/modals/photo-expanded-modal/photo-expanded-modal.component';
import { FishUpdateAction, FishLoadByIdAction } from 'src/app/store/fish/fish.actions';
import { getSelectedFish, isUpdatingFish, isCreatingFish, getFishUpdateError } from 'src/app/store/fish/fish.selector';
import { FishBreedModalComponent } from 'src/app/modules/SharedModule/modals/fish-breed-modal/fish-breed-modal.component';
import { FishTransferModalComponent } from 'src/app/modules/SharedModule/modals/fish-transfer-modal/fish-transfer-modal.component';
import { FishDiseaseModalComponent } from 'src/app/modules/SharedModule/modals/fish-disease-modal/fish-disease-modal.component';
import { AttachmentUploaderComponent } from 'src/app/modules/SharedModule/attachment-uploader/attachment-uploader.component';
import { NotificationService } from 'src/app/services/notification.service';



@Component({
    selector: 'fish-detail-view',
    templateUrl: './fish-detail-view.component.html',
    styleUrls: ['./fish-detail-view.component.scss']
})
export class FishDetailViewComponent implements OnInit {
    @Input("fish") fish: Fish;
    @Input("aquarium") aquarium: Aquarium;

    @ViewChild(AttachmentUploaderComponent) attachmentComponent: AttachmentUploaderComponent;

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
    private _matchedSpecies: Species;
    uploadingPhoto: boolean;


    constructor(private store: Store<AppState>, private notifier: NotificationService, private dialog: MatDialog, private _aquariumService: AquariumService) {

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
                }, () => {
                    this.notifier.notify("error", "Could not delete fish");
                    this.disabled = false;
                });
            }
        });
    }
    clickBreed() {
    }
    clickDiagnose() {
    }
    clickTransfer() {
    }
    getFishAge(fish: Fish) {
        return moment().diff(fish.date, "days");
    }

    getFishPhotoSource(photo: FishPhoto) {
        return this._aquariumService.getPhotoPermalink(photo.photo);
    }
    getPhotoDate(photo: FishPhoto) {
        return moment(photo.photo.date).local().calendar();
    }
    public clickFishPhoto(fishPhoto: FishPhoto) {
    }
    public clickUploadFishPhoto(fishId: number) {
        var attachment = this.attachmentComponent.getAttachment();
        if (!attachment)
            return false;
        this.uploadingPhoto = true;
        this._aquariumService.uploadFishPhoto(fishId, attachment).subscribe(() => {
            this.uploadingPhoto = false;
            this.store.dispatch(new FishLoadByIdAction(fishId));
            this.attachmentComponent.clearAttachment();
        }, () => {
            this.uploadingPhoto = false;
            this.notifier.notify("error", "Could not upload fish photo.");
        });
    }
}

