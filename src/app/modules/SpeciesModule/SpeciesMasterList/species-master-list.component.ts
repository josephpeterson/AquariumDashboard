import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import {Location} from '@angular/common';
import { Species } from 'src/app/models/Species';
import { AquariumUnSelectionAction } from 'src/app/store/aquarium/aquarium.actions';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { SpeciesMasterListComponentData } from './species-master-list.component.data';


@Component({
  selector: 'species-master-list',
  templateUrl: './species-master-list.component.html',
  styleUrls: ['./species-master-list.component.scss']
})
export class SpeciesMasterListComponent implements OnInit {
  public speciesId: number = -1;

  public faCreate = faPlus;

  public loading$ = this.dataSource.loading$;
  public species$ = this.dataSource.species$;

  constructor(
    private dataSource: SpeciesMasterListComponentData,
    public dialog: MatDialog,
    public store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) { }

  ngOnInit() {
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

