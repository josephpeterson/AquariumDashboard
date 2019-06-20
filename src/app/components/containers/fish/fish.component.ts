import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ManageSpeciesModalComponent } from '../../modals/manage-species-modal/manage-species-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Fish } from 'src/app/models/Fish';
import { Observable } from 'rxjs';
import { Aquarium } from 'src/app/models/Aquarium';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { ManageFishModalComponent } from '../../modals/manage-fish-modal/manage-fish-modal.component';
import { AquariumFeeding } from 'src/app/models/AquariumFeeding';

@Component({
  selector: 'fish-page-component',
  templateUrl: './fish.component.html',
  styleUrls: ['./fish.component.scss']
})


export class FishComponent implements OnInit {

  public selectedFishId: number;
  public selectedFish: Fish;
  public selectedAquariumId:number;

  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);

  constructor(
    public dialog: MatDialog,
    public store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if(p.fishId)
      {
        this.selectedFishId = p.fishId;
      }
    });
  }
  getSelectedFish(aquarium: Aquarium) {
    if(!aquarium.fish) return;
    return aquarium.fish.filter(fish => fish.id == this.selectedFishId)[0];
  }
  openManageFishModal() {
    var inst  = this.dialog.open(ManageFishModalComponent,{
      height: "70%",
      width: "60%",
    });
    inst.componentInstance.loadAquarium(this.selectedAquariumId);
  }

  selectFish(fish: Fish) {
    var url = [fish.aquariumId,"fish",fish.id];
    this.router.navigate(url);
  }
}

