import { Component, OnInit, Input } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumLoadByIdAction } from 'src/app/store/aquarium/aquarium.actions';
import { getAquariumById, getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { takeUntil } from 'rxjs/operators';
import { Aquarium } from 'src/app/models/Aquarium';
import { Fish } from 'src/app/models/Fish';
import { Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'fish-add-modal',
  templateUrl: './fish-add-modal.component.html',
  styleUrls: ['./fish-add-modal.component.scss']
})
export class FishAddModalComponent implements OnInit {

  @Input() fish: Fish = new Fish();
  @Input() fishId: number;
  @Input() aquarium: Aquarium;

  public selectedFishId;
  public addingFish;

  public aquarium$ = this.store.select(getSelectedAquarium);

  public componentLifecycle = new Subject();

  constructor(private store: Store<AppState>,private _dialogRef: MatDialogRef<FishAddModalComponent>) {
  }
  ngOnInit() {
  }

  public clickClose() {
    this._dialogRef.close();
  }
}