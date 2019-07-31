import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AquariumService } from 'src/app/services/aquarium-service/aquarium.service';
import { Aquarium } from 'src/app/models/Aquarium';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { take } from 'rxjs/operators';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { ManageSnapshotModal } from 'src/app/components/modals/manage-snapshot-modal/manage-snapshot-modal.component';

@Component({
  selector: 'aquarium-parameters',
  templateUrl: './aquarium-parameters.component.html',
  styleUrls: ['./aquarium-parameters.component.scss']
})
export class AquariumParametersComponent implements OnInit {

  public aquarium: Aquarium;

  constructor(public aquariumService: AquariumService,
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
