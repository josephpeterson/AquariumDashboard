import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AquariumService } from 'src/app/services/aquarium.service';
import { Aquarium } from 'src/app/models/Aquarium';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { take } from 'rxjs/operators';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { NotificationService } from 'src/app/services/notification.service';
import { CreateWaterParameterModalComponent } from 'src/app/modules/SharedModule/modals/create-water-parameter-modal/create-water-parameter-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { ATOStatus } from 'src/app/models/ATOStatus';
import { PaginationSliver } from 'src/app/models/PaginationSliver';
import { WaterDosing } from 'src/app/models/WaterDosing';
import { CreateWaterChangeModalComponent } from 'src/app/modules/SharedModule/modals/create-water-change-modal/create-water-change-modal.component';
import { CreateWaterDoseModalComponent } from 'src/app/modules/SharedModule/modals/create-water-dose-modal/create-water-dose-modal.component';
import { getPaginatedATOStatuses, getPaginatedParameters, getPaginatedWaterChanges, getPaginatedWaterDosings, getSelectedDate } from 'src/app/store/parameter/parameter.selector';
import { ParameterState } from 'src/app/store/parameter/parameter.reducer';
import { WaterChange } from 'src/app/models/WaterChange';
import { ParameterReloadDateAction, ParameterSelectDateAction } from 'src/app/store/parameter/parameter.actions';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'parameters-overview',
  templateUrl: './parameters-overview.component.html',
  styleUrls: ['./parameters-overview.component.scss']
})
export class ParametersOverviewComponent implements OnInit {

  public aquarium: Aquarium;
  public pagination: PaginationSliver = new PaginationSliver();
  /* Water Parameters */
  public waterATOData$: Subject<any> = new Subject();
  public waterDosingData$: Subject<any> = new Subject();
  public waterChangeData$: Subject<any> = new Subject();
  /* Reef Paramemters */
  public waterAlkalinityData$: Subject<any> = new Subject();
  public waterMagnesiumData$: Subject<any> = new Subject();
  public waterCalciumData$: Subject<any> = new Subject();
  /* Basic Parameters */
  public waterNitrateData$: Subject<any> = new Subject();
  public waterNitriteData$: Subject<any> = new Subject();
  public waterPhData$: Subject<any> = new Subject();

  public dateRange: FormGroup;
  public selectedDate$: Observable<ParameterState> = this.store.select(getSelectedDate);



  constructor(public aquariumService: AquariumService,
    public dialog: MatDialog,
    public store: Store<AppState>,
    public notificationService: ToastrService
  ) { }

  ngOnInit() {
    this.store.select(getSelectedAquarium).pipe(take(1)).subscribe(aq => this.aquarium = aq);
    this.store.select(getPaginatedATOStatuses).subscribe(atoStatuses =>
      this.parseATOData(atoStatuses)
    );
    this.store.select(getPaginatedParameters).subscribe(parameters =>
      this.parseParameterData(parameters)
    );
    this.store.select(getPaginatedWaterChanges).subscribe(waterChanges =>
      this.parseWaterChangeData(waterChanges)
    );
    this.store.select(getPaginatedWaterDosings).subscribe(waterDosings =>
      this.parseWaterDosingData(waterDosings)
    );
  }
  public parseATOData(atoStatuses: ATOStatus[]) {
    if (!atoStatuses)
      return;
    function computeDuration(atoStatus: ATOStatus) {
      var actual = moment(atoStatus.endTime);
      var est = moment(atoStatus.startTime);
      var s = moment.duration(actual.diff(est)).asSeconds();
      return Math.ceil(s);
    }
    //Create data for graph
    var data = [];
    atoStatuses.forEach(h => {
      //did it complete?
      if (h.endTime == undefined)
        return;

      data.push({
        x: moment.utc(h.startTime).local().toDate(),
        y: (computeDuration(h) * h.mlPerSec) / 3785 //gallons
      })
    });
    this.waterATOData$.next(data);
  }
  public parseWaterChangeData(waterChanges: WaterChange[]) {
    if (!waterChanges)
      return;
    var data = [];
    waterChanges.forEach(h => {
      data.push({
        x: moment.utc(h.startTime).local().toDate(),
        y: h.gallonsAdded
      })
    });
    this.waterChangeData$.next(data);
  }
  public parseWaterDosingData(waterDosings: WaterDosing[]) {
    if (!waterDosings)
      return;
 
    var data = [];
    waterDosings.forEach(h => {
      data.push({
        x: moment.utc(h.startTime).local().toDate(),
        y: h.amount
      })
    });
    this.waterDosingData$.next(data);
  }
  public parseParameterData(parameters: AquariumSnapshot[]) {
    if(!parameters)
      return;
    var alkalinityData = [];
    var calciumData = [];
    var magnesiumData = [];
    var nitrateData = [];
    var nitriteData = [];
    var phData = [];
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
      if (p.nitrate != null)
        nitrateData.push({
          x: moment.utc(p.startTime).local().toDate(),
          y: p.nitrate
        })
      if (p.nitrite != null)
        nitriteData.push({
          x: moment.utc(p.startTime).local().toDate(),
          y: p.nitrite
        })
      if (p.ph != null)
        phData.push({
          x: moment.utc(p.startTime).local().toDate(),
          y: p.ph
        })
    });
    this.waterNitrateData$.next(nitrateData);
    this.waterNitriteData$.next(nitriteData);
    this.waterPhData$.next(phData);
    this.waterAlkalinityData$.next(alkalinityData);
    this.waterMagnesiumData$.next(magnesiumData);
    this.waterCalciumData$.next(calciumData);
  }
  public addWaterChangeData() {
    this.dialog.open(CreateWaterChangeModalComponent, {
      data: this.aquarium,
    }).afterClosed().subscribe((newParameter: AquariumSnapshot) => {
      if (!newParameter)
        return;
      this.notificationService.success( `New water change added (id: ${newParameter.id})`)
      //this.updateFilteredDate();
    });
  }
  public addWaterDoseData() {
    this.dialog.open(CreateWaterDoseModalComponent, {
      data: this.aquarium,
    }).afterClosed().subscribe((newParameter: WaterDosing) => {
      if (!newParameter)
        return;
      this.notificationService.success( `New water dosing added (id: ${newParameter.id})`)
      //this.updateFilteredDate();
    });
  }
  public addWaterParameter(parameterName: string) {
    var d = this.dialog.open(CreateWaterParameterModalComponent, {
      width: "50%",
      data: this.aquarium,
    });
    d.componentInstance.focus = parameterName;
    
    d.afterClosed().subscribe((newParameter: AquariumSnapshot) => {
      if (!newParameter)
        return;
      this.notificationService.success( `New water parameter added (id: ${newParameter.id})`)
      //this.updateFilteredDate();
    })
  }
}
