import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import {Location} from '@angular/common';
import { Species } from 'src/app/models/Species';
import { AquariumUnSelectionAction } from 'src/app/store/aquarium/aquarium.actions';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'species-product-card',
  templateUrl: './species-product-card.component.html',
  styleUrls: ['./species-product-card.component.scss']
})
export class SpeciesProductCard implements OnInit {
  public speciesId: number = -1;

  public faCreate = faPlus;

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
