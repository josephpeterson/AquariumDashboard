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
import * as moment from 'moment';



@Component({
    selector: 'species-card',
    templateUrl: './species-card.component.html',
    styleUrls: ['./species-card.component.scss']
})
export class SpeciesCardComponent implements OnInit {
    @Input("species") species: Species;
    @Input("speciesId") speciesId: number;
    private componentLifecycle$ = new Subject();


    constructor(private store: Store<AppState>, private notifier: NotifierService, private dialog: MatDialog, private router: Router) {

    }
    ngOnInit() {
        if(!this.species && this.speciesId)
        {
            console.log("todo","load species by id");
        }
    }

    ngOnDestory() {
        this.componentLifecycle$.next();
        this.componentLifecycle$.unsubscribe();
    }
}