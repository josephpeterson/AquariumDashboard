import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import {Location} from '@angular/common';
import { Species } from 'src/app/models/Species';
import { AquariumUnSelectionAction } from 'src/app/store/aquarium/aquarium.actions';


@Component({
  selector: 'species-container',
  templateUrl: './species-container.component.html',
  styleUrls: ['./species-container.component.scss']
})
export class SpeciesContainer implements OnInit {
  public speciesId: number = -1;

  constructor(
    public dialog: MatDialog,
    public store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) { }

  ngOnInit() {
    this.store.dispatch(new AquariumUnSelectionAction());
    this.route.params.subscribe(p => {
      if(p.speciesId)
      {
        this.speciesId = p.speciesId;
      }
    });
  }

  clickSpecies(species: Species) {
    var url = ["species", species.id];
    this.router.navigate(url);
  }
  clickBack() {
    this._location.back();
  }
}

