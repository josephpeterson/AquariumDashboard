import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AquariumService } from 'src/app/services/aquarium.service';
import { Aquarium } from 'src/app/models/Aquarium';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { take } from 'rxjs/operators';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { ManageSnapshotModal } from 'src/app/modules/SharedModule/modals/manage-snapshot-modal/manage-snapshot-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { PaginationSliver } from 'src/app/models/PaginationSliver';
import { ATOStatus } from 'src/app/models/ATOStatus';
import * as moment from 'moment';

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
    var snapshot = new AquariumSnapshot();
    snapshot.aquariumId = this.aquarium.id;
    snapshot.date = new Date();
    this.dialog.open(ManageSnapshotModal, {
      //width: "50%",
      data: snapshot
    }).afterClosed().subscribe((snapshot: AquariumSnapshot) => {
      if (snapshot) {
        //add snapshot to table
      }
    });
  }

}
