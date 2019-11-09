import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Species } from 'src/app/models/Species';
import { select, Store } from '@ngrx/store';
import { getAllSpecies } from 'src/app/store/species/species.selector';
import { Subject, Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { CreateSpeciesModalComponent } from '../../../shared/modals/create-species-modal/create-species-modal.component';
import { Fish } from 'src/app/models/Fish';
import { getAquariumById, getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumLoadByIdAction } from 'src/app/store/aquarium/aquarium.actions';
import { AquariumService } from 'src/app/services/aquarium.service';
import { FishService } from 'src/app/services/fish.service';

@Component({
    selector: 'fish-select',
    templateUrl: './fish-select.component.html',
    styleUrls: ['./fish-select.component.scss'],
})
export class FishSelectComponent {
    public availableFish: Fish[];
    public componentLifeCycle$ = new Subject();
    @Input() public control: FormControl = new FormControl();
    
    constructor(private fishService: FishService) {
    }
    ngOnInit() {

        this.fishService.getAllFish().subscribe(res => this.availableFish = res,err => {

        });
    }
    ngOnDestory() {
        this.componentLifeCycle$.next();
        this.componentLifeCycle$.unsubscribe();
    }
}