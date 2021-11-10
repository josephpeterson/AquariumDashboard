import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Fish } from 'src/app/models/Fish';
import { Observable } from 'rxjs';
import { Aquarium } from 'src/app/models/Aquarium';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { getAllFish, getFishLoadError } from 'src/app/store/fish/fish.selector';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'aquarium-fish',
  templateUrl: './aquarium-fish.component.html',
  styleUrls: ['./aquarium-fish.component.scss']
})


export class AquariumFishComponent implements OnInit {

  public fishId: number;
  public fish: Fish;

  public selectedAquariumId;

  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);
  public fish$: Observable<Fish[]> = this.store.select(getAllFish);
  public fishLoadError$: Observable<HttpErrorResponse> = this.store.select(getFishLoadError);


  constructor(
    public dialog: MatDialog,
    public store: Store<AppState>,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
  }

  openManageFishModal() {
  }

  selectFish(fish: Fish) {
    this.router.navigateByUrl("/fish/" + fish.id);
  }

  clickBack() {
    this.location.back();
  }
}

