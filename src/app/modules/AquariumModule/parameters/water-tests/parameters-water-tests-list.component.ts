import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AquariumService } from 'src/app/services/aquarium.service';
import { Aquarium } from 'src/app/models/Aquarium';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { take } from 'rxjs/operators';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { CreateWaterParameterModalComponent } from 'src/app/modules/SharedModule/modals/create-water-parameter-modal/create-water-parameter-modal.component';

@Component({
  selector: 'parameters-water-tests-list',
  templateUrl: './parameters-water-tests-list.component.html',
  styleUrls: ['./parameters-water-tests-list.component.scss']
})
export class ParametersWaterTestsListComponent implements OnInit {

  public aquarium: Aquarium;

  constructor(public _aquariumService: AquariumService,
    public dialog: MatDialog,
    public store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select(getSelectedAquarium).pipe(take(1)).subscribe(aq => this.aquarium = aq);

  }

  clickAddSnapshot() {
    this.dialog.open(CreateWaterParameterModalComponent, {
      //width: "50%",
      data: this.aquarium
    }).afterClosed().subscribe((snapshot: AquariumSnapshot) => {
      if (snapshot) {
        //add snapshot to table
      }
    });
  }

}
