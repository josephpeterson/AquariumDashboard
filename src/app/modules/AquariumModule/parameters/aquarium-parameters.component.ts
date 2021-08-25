import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
import { FormControl, FormGroup } from '@angular/forms';
import { CreateWaterParameterModalComponent } from '../../SharedModule/modals/create-water-parameter-modal/create-water-parameter-modal.component';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'aquarium-parameters',
  templateUrl: './aquarium-parameters.component.html',
  styleUrls: ['./aquarium-parameters.component.scss']
})
export class AquariumParametersComponent implements OnInit {

  public aquarium: Aquarium;
  public pagination: PaginationSliver = new PaginationSliver();
  public waterATOData$: Subject<any> = new Subject();
  public waterAlkalinityData$: Subject<any> = new Subject();
  public waterMagnesiumData$: Subject<any> = new Subject();
  public waterCalciumData$: Subject<any> = new Subject();

  public dateRange: FormGroup;


  constructor(public aquariumService: AquariumService,
    public notificationService: NotificationService,
    public dialog: MatDialog,
    public store: Store<AppState>
  ) {
    this.dateRange = new FormGroup({
      end: new FormControl(new Date()),
      start: new FormControl(moment().subtract(30, 'd').toDate())
    });
  }

  ngOnInit() {
    this.store.select(getSelectedAquarium).pipe(take(1)).subscribe(aq => this.aquarium = aq);

    this.updateFilteredDate();

    this.addWaterParameter();
  }

  clickAddSnapshot() {
    var snapshot = new AquariumSnapshot();
    snapshot.aquariumId = this.aquarium.id;
    snapshot.startTime = new Date();
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
    //this.pagination.startDate = moment().utc().subtract(60, 'd').format();

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
        if (h.actualEndTime == undefined)
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
  public addWaterATOData() {

  }
  public loadWaterParameterData() {
    this.pagination.descending = true;
    this.pagination.count = 100;
    this.aquariumService.getWaterParameters(this.aquarium.id, this.pagination).subscribe((parameters: AquariumSnapshot[]) => {
      console.log("Alkalinity data:", parameters);
      //Create data for graph
      var alkalinityData = [];
      var calciumData = [];
      var magnesiumData = [];
      parameters.forEach(p => {

        if (p.alkalinity != null)
          alkalinityData.push({
            x: moment.utc(p.startTime).local().toDate(),
            y: p.alkalinity
          })
        if (p.magnesium != null)
          magnesiumData.push({
            x: moment.utc(p.startTime).local().toDate(),
            y: p.magnesium
          })
        if (p.calcium != null)
          calciumData.push({
            x: moment.utc(p.startTime).local().toDate(),
            y: p.calcium
          })
      })
      this.waterAlkalinityData$.next(alkalinityData);
      this.waterMagnesiumData$.next(magnesiumData);
      this.waterCalciumData$.next(calciumData);
      //this.loading = false;
    }, (err: HttpErrorResponse) => {
      //this.loading = false;
    })
  }
  public addWaterParameter() {
    console.log("adding water parameter...");
    this.dialog.open(CreateWaterParameterModalComponent, {
      width: "50%",
      data: this.aquarium,
    }).afterClosed().subscribe((newParameter: AquariumSnapshot) => {
      if(!newParameter) 
        return;
      this.notificationService.notify("success",`New water parameter added (id: ${newParameter.id})`)
      this.updateFilteredDate();
    });

    var snapshot = new AquariumSnapshot();
    snapshot.startTime
    this.aquariumService.createSnapshot(snapshot, null);
  }



  public updateFilteredDate() {
    var startDate = this.dateRange.value.start;
    var endDate = this.dateRange.value.end;
    if (startDate)
      this.pagination.startDate = moment(startDate).utc().startOf('day').format();
    else
      delete this.pagination.startDate;

    if (endDate)
      this.pagination.endDate = moment(endDate).utc().endOf('day').format();
    else
      delete this.pagination.endDate;

    this.loadWaterATOData();
    this.loadWaterParameterData();
  }
}
