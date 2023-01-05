import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ConnectionError } from 'src/app/models/ConnectionError';
import { Species } from 'src/app/models/Species';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

import { SpeciesAddAction } from 'src/app/store/species/species.actions';
import { take, takeUntil } from 'rxjs/operators';
import { getSpeciesCreateError, isCreatingSpecies } from 'src/app/store/species/species.selector';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'create-species-modal',
  templateUrl: './create-species-modal.component.html',
  styleUrls: ['./create-species-modal.component.scss']
})
export class CreateSpeciesModalComponent implements OnInit {

  public selectedSpeciesId;
  public addingSpecies;

  public species: Species = new Species();
  public addError$: any = this.store.select(getSpeciesCreateError);
  public adding$: any = this.store.select(isCreatingSpecies);
  public componentLifeCycle = new Subject();


  constructor(private store: Store<AppState>,private _dialog: MatDialogRef<CreateSpeciesModalComponent>, private notifier: ToastrService) { }
  ngOnInit() {

  }
  ngOnDestroy() {
    this.componentLifeCycle.next();
    this.componentLifeCycle.unsubscribe();
  }

  clickNewSpecies() {
    var species = this.species;
    var adding = true;
    this.store.dispatch(new SpeciesAddAction(species));
    this.addError$.pipe(take(2)).subscribe(err => {
        if (err && adding) {
            console.log(err);
            adding = false;
            this.notifier.error( "Unable to add fish species.");
            console.log(err);
        }
    })
    this.adding$.pipe(take(2)).subscribe(val => {
        if (!val && adding){
            this.notifier.success( "Added new fish species.");
            this._dialog.close();
        }
    });
}
}