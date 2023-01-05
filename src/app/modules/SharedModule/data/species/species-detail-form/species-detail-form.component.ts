import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getAllSpecies, getSpeciesCreateError, getSpeciesUpdateError, isCreatingSpecies, isUpdatingSpecies, getSpeciesDeleteError, isDeletingSpecies } from 'src/app/store/species/species.selector';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Species } from 'src/app/models/Species';

import { SpeciesAddAction, SpeciesUpdateAction, SpeciesDeleteAction } from 'src/app/store/species/species.actions';
import { NotificationService } from 'src/app/services/notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'species-detail-form',
    templateUrl: './species-detail-form.component.html',
    styleUrls: ['./species-detail-form.component.scss']
})
export class SpeciesDetailFormComponent implements OnInit {
    @Input("speciesId") speciesId;

    @Output() onSuccess = new EventEmitter();

    public exists = false;

    public species: Species = new Species();

    public species$ = this.store.select(getAllSpecies);

    public addError$ = this.store.select(getSpeciesCreateError);
    public updateError$ = this.store.select(getSpeciesUpdateError);
    public deleteError$ = this.store.select(getSpeciesDeleteError);

    public adding$ = this.store.select(isCreatingSpecies);
    public updating$ = this.store.select(isUpdatingSpecies);
    public deleting$ = this.store.select(isDeletingSpecies);

    public componentLifecycle = new Subject();
    

    constructor(private store: Store<AppState>, private notifier: ToastrService) {

    }
    ngOnInit() {
        this.species$.pipe(takeUntil(this.componentLifecycle)).subscribe(species => {
            if(this.speciesId)
            {
                species.forEach(s => {
                    if(s.id == this.speciesId)
                    {
                        this.species = s;
                        this.exists = true;
                    }
                });
            }
            else
                this.exists = false;
        });
    }

    ngOnDestory() {
        this.componentLifecycle.next();
        this.componentLifecycle.unsubscribe();
    }

    clickUpdate() {
        var species = this.species
        var updating = true;

        this.store.dispatch(new SpeciesUpdateAction(species));
        this.updateError$.pipe(take(2)).subscribe(err => {
            if (err && updating) {
                updating = false;
                this.notifier.error( "Unable to update fish species.");
                console.log(err);
            }
        })
        this.updating$.pipe(take(2)).subscribe(val => {
            if (!val && updating) {
                this.notifier.success( "Fish species was updated.");
                this.actionSuccess();
            }
        });
    }
    clickNewSpecies() {
        var species = this.species
        var adding = true;

        this.store.dispatch(new SpeciesAddAction(species));
        this.addError$.pipe(take(2)).subscribe(err => {
            if (err) {
                adding = false;
                this.notifier.error( "Unable to add fish species.");
                console.log(err);
            }
        })
        this.adding$.pipe(take(2)).subscribe(val => {
            if (!val && adding){
                this.notifier.success( "Added new fish species.");
                this.actionSuccess();
            }
        });
    }
    clickDeleteSpecies() {
        var species = this.species;
        var removing = true;

        this.store.dispatch(new SpeciesDeleteAction(species));
        this.deleteError$.pipe(take(2)).subscribe(err => {
            if (err && removing) {
                removing = false;
                this.notifier.error( "Unable to delete fish species.");
                console.log(err);
            }
        })
        this.deleting$.pipe(take(2)).subscribe(val => {
            if (!val && removing) {
                this.notifier.success( "Fish species was deleted.");
                this.actionSuccess();
            }
        });
    }

    actionSuccess() {
        this.onSuccess.emit();
    }
    
}