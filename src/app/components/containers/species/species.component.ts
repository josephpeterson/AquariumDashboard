import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import {Location} from '@angular/common';


@Component({
  selector: 'species-page-component',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements OnInit {
  public speciesId: number = -1;

  constructor(
    public dialog: MatDialog,
    public store: Store<AppState>,
    private route: ActivatedRoute,
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

  clickBack() {
    this._location.back();
  }
}

