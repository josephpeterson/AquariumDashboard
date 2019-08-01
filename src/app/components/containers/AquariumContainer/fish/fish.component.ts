import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ManageSpeciesModalComponent } from '../../../shared/modals/manage-species-modal/manage-species-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Fish } from 'src/app/models/Fish';
import { Observable } from 'rxjs';
import { Aquarium } from 'src/app/models/Aquarium';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { ManageFishModalComponent } from '../../../shared/modals/manage-fish-modal/manage-fish-modal.component';
import { FishLoadByAquariumIdAction, FishLoadByFishIdAction } from 'src/app/store/fish/fish.actions';
import { getAllFish, getFishLoadError, getFishById } from 'src/app/store/fish/fish.selector';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { take } from 'rxjs/operators';

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
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p.fishId) {
        this.fishId = p.fishId;

        this.store.select(getFishById(p.fishId)).pipe(take(1)).subscribe(fish => {
          if(!fish) this.store.dispatch(new FishLoadByFishIdAction(p.fishId));
        });
        
      }
    });
    this.fish$.subscribe(fish => {
      var list = fish.filter(f => f.id == this.fishId);
      if (list.length > 0)
        this.fish = list[0];
    });
    this.fishLoadError$.subscribe(err => {
      if (err) alert(err);
    });
  }

  openManageFishModal() {
    var inst = this.dialog.open(ManageFishModalComponent, {
      height: "70%",
      width: "60%",
    });
    inst.componentInstance.loadAquarium(this.selectedAquariumId);
  }

  selectFish(fish: Fish) {
    var url = [fish.aquariumId, "fish", fish.id];
    this.router.navigate(url);
  }

  clickBack() {
    this.location.back();
  }
}

