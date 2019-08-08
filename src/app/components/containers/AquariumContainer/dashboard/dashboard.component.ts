import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { Observable } from 'rxjs';
import { Aquarium } from 'src/app/models/Aquarium';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { AppState } from 'src/app/app.state';
import { take } from 'rxjs/operators';
import { AquariumService } from 'src/app/services/aquarium.service';
import { ManageSnapshotModal } from 'src/app/components/shared/modals/manage-snapshot-modal/manage-snapshot-modal.component';
import * as moment from 'moment';

@Component({
  selector: 'dashboard-page-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

  faExclamationTriangle = faExclamationTriangle;

  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);
  public aquarium: Aquarium;

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private aquariumService: AquariumService
  ) { }

  ngOnInit() {
    this.aquarium$.pipe(take(1)).subscribe(aq => {
      this.aquarium = aq;
    });
  }
}