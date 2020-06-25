import { Component, OnInit, Input } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumLoadByIdAction } from 'src/app/store/aquarium/aquarium.actions';
import { takeUntil, take } from 'rxjs/operators';
import { Aquarium } from 'src/app/models/Aquarium';
import { Fish } from 'src/app/models/Fish';
import { Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { FishAddAction } from 'src/app/store/fish/fish.actions';
import { isCreatingFish, getFishCreateError } from 'src/app/store/fish/fish.selector';

@Component({
  selector: 'fish-add-modal',
  templateUrl: './fish-add-modal.component.html',
  styleUrls: ['./fish-add-modal.component.scss']
})
export class FishAddModalComponent implements OnInit {

  public fish: Fish;

  private addingFish$ = this.store.select(isCreatingFish);
  private addError$ = this.store.select(getFishCreateError);

  public error:string;

  constructor(private store: Store<AppState>, private _dialogRef: MatDialogRef<FishAddModalComponent>) {
  }
  ngOnInit() {

  }

  public clickClose() {
    this._dialogRef.close();
  }

  public clickAdd() {
    var updating = true;
    this.error = "";
    this.store.dispatch(new FishAddAction(this.fish));
    this.addError$.pipe(take(2)).subscribe(err => {
      if (err && updating) {
        updating = false;
        this.error = "Unable to add fish";
        console.log(err);
      }
    })
    this.addingFish$.pipe(take(2)).subscribe(val => {
      if (!val && updating) {
        //todo update aquarium store
        this.store.dispatch(new AquariumLoadByIdAction(this.fish.aquariumId));
        this._dialogRef.close();
      }
    });
  }
}