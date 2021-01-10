import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import {Location} from '@angular/common';
import { Species } from 'src/app/models/Species';
import { AquariumUnSelectionAction } from 'src/app/store/aquarium/aquarium.actions';
import { faPlus, faStar } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'species-search-refiner',
  templateUrl: './species-search-refiner.component.html',
  styleUrls: ['./species-search-refiner.component.scss']
})
export class SpeciesSearchRefinerComponent implements OnInit {

  public foods = [];
  public speciesId: number = -1;

  public faCreate = faPlus;
  public faStar = faStar;

  @Input() species: Species;

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

