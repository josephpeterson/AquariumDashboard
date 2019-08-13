import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Species } from 'src/app/models/Species';
import { select, Store } from '@ngrx/store';
import { getAllSpecies } from 'src/app/store/species/species.selector';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ManageSpeciesModalComponent } from '../../../shared/modals/manage-species-modal/manage-species-modal.component';
import { Fish } from 'src/app/models/Fish';
import { SpeciesLoadAction } from 'src/app/store/species/species.actions';
import { TypeCheckCompiler } from '@angular/compiler/src/view_compiler/type_check_compiler';
import { FishPhotoSelectModal } from 'src/app/components/shared/modals/fish-photo-select-modal/fish-photo-select-modal.component';
import { AquariumService } from 'src/app/services/aquarium.service';

@Component({
    selector: 'fish-photo-select',
    templateUrl: './fish-photo-select.component.html',
    styleUrls: ['./fish-photo-select.component.scss'],
})
export class FishPhotoSelectComponent {
    public availableSpecies: Species[] = [];

    public species$ = this.store.pipe(select(getAllSpecies));
    public componentLifeCycle$ = new Subject();

    public selectControl: FormControl = new FormControl();

    @Output() onChange = new EventEmitter();
    //@Input() value: Species;
    @Input() fish: Fish;

    constructor(private _aquariumService: AquariumService,
        private store: Store<AppState>,private dialog:MatDialog) {
    }
    ngOnInit() {
  
    }
    ngOnDestory() {
        this.componentLifeCycle$.next();
        this.componentLifeCycle$.unsubscribe();
    }

    public clickOpenSelect() {
        var dialog = this.dialog.open(FishPhotoSelectModal,{

        });
        dialog.componentInstance.fish = this.fish;
        dialog.afterClosed().subscribe(photoId => {
            if(isNaN(photoId))
                return;
            this.fish.thumbnailPhotoId = photoId;
        });
    }

    public getThumbnailSource() {
        return this._aquariumService.getFishPhotoPermalink(this.fish.thumbnailPhotoId);
    }
}