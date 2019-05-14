import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectAquarium, isLoading } from '../../store/aquarium/aquarium.selector';
import { AquariumLoadAction, AquariumActions, AllAquariumActions, AquariumSelectionAction } from 'src/app/store/aquarium/aquarium.actions';
import { map, filter } from 'rxjs/operators';
import { AquariumEffects } from 'src/app/store/aquarium/aquarium.effect';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Aquarium } from 'src/app/models/Aquarium';

@Component({
  selector: 'aquarium-selection-component',
  templateUrl: './aquarium-selection.component.html',
  styleUrls: ['./aquarium-selection.component.scss']
})
export class AquariumSelectionComponent implements OnInit {


  constructor(private store: Store<AppState>,
    public dialog: MatDialog,
  ) {
    //this.aquariums = store.pipe(select('aquariums'));
  }

  public aquariums = this.store.pipe(select(selectAquarium));
  public loading = this.store.select(isLoading);



  ngOnInit() {
    this.store.dispatch(new AquariumLoadAction());
  }

  selectAquarium(aquarium: Aquarium) {
    this.store.dispatch(new AquariumSelectionAction(aquarium.id));
  }
}

