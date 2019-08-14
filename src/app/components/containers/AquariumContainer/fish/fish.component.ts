import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Fish } from 'src/app/models/Fish';
import { Observable } from 'rxjs';
import { Aquarium } from 'src/app/models/Aquarium';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { ManageFishModalComponent } from '../../../shared/modals/manage-fish-modal/manage-fish-modal.component';
import { getAllFish, getFishLoadError } from 'src/app/store/fish/fish.selector';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'fish-page-component',
  templateUrl: './fish.component.html',
  styleUrls: ['./fish.component.scss']
})


export class FishComponent implements OnInit {

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

