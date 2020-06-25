import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Species } from 'src/app/models/Species';
import { select, Store } from '@ngrx/store';
import { getAllSpecies } from 'src/app/store/species/species.selector';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Fish } from 'src/app/models/Fish';
import { SpeciesLoadAction } from 'src/app/store/species/species.actions';
import { TypeCheckCompiler } from '@angular/compiler/src/view_compiler/type_check_compiler';
import { AquariumService } from 'src/app/services/aquarium.service';
import { FishPhoto } from 'src/app/models/FishPhoto';
import { FishPhotoSelectModal } from '../../../modals/fish-photo-select-modal/fish-photo-select-modal.component';

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
        dialog.afterClosed().subscribe((photo:FishPhoto) => {
            console.log(photo);
            if(!photo)
                return;
            this.fish.thumbnailPhotoId = photo.id;
        });
    }

    public getThumbnailSource() {
        return this._aquariumService.getPhotoPermalink(this.fish.thumbnail.photo,"0.25");
    }
}