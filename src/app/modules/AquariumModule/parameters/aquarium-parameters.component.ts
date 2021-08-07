import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AquariumService } from 'src/app/services/aquarium.service';
import { Aquarium } from 'src/app/models/Aquarium';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { take } from 'rxjs/operators';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { ManageSnapshotModal } from 'src/app/modules/SharedModule/modals/manage-snapshot-modal/manage-snapshot-modal.component';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ATOStatus } from 'src/app/models/ATOStatus';
import { PaginationSliver } from 'src/app/models/PaginationSliver';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'aquarium-parameters',
  templateUrl: './aquarium-parameters.component.html',
  styleUrls: ['./aquarium-parameters.component.scss']
})
export class AquariumParametersComponent implements OnInit {

  public aquarium: Aquarium;
  public pagination: PaginationSliver = new PaginationSliver();
  public waterATOData$: Subject<any> = new Subject();
  public selectedDateFilter = new FormControl();


  constructor(public aquariumService: AquariumService,
    public dialog: MatDialog,
    public store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select(getSelectedAquarium).pipe(take(1)).subscribe(aq => this.aquarium = aq);
    this.loadWaterATOData();
    this.waterATOData$.next();

    this.selectedDateFilter.valueChanges.subscribe(v => {
      this.updateFilteredDate();
    });
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

  public loadWaterATOData() {
    this.pagination.descending = true;
    this.pagination.count = 100;
    this.pagination.startDate = moment().utc().subtract(60,'d').format();
    this.aquariumService.getDeviceATOHistory(this.aquarium.device.id, this.pagination).subscribe((atoHistory: ATOStatus[]) => {



      function computeDuration(atoStatus: ATOStatus) {
        var actual = moment(atoStatus.actualEndTime);
        var est = moment(atoStatus.startTime);
        var s = moment.duration(actual.diff(est)).asSeconds();
        return Math.ceil(s);
      }
      //Create data for graph
      var data = [];
      atoHistory.forEach(h => {
        //did it complete?
        if(h.actualEndTime == undefined)
          return;

        data.push({
          x: moment.utc(h.startTime).local().toDate(),
          y: (computeDuration(h) * h.mlPerSec) / 3785 //gallons
        })
      })
      this.waterATOData$.next(data);
      //this.loading = false;
    }, (err: HttpErrorResponse) => {
      //this.loading = false;
    })
  }
  public updateFilteredDate() {
    var date = this.selectedDateFilter.value;
    if(!date) {
      console.error("Invalid filtered date selected")
      return;
    }
    console.log("Have new date:",date);

    this.pagination.startDate = moment(date).utc().format();
  }
}
