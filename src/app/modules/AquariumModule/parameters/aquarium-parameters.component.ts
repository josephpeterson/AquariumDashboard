import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AquariumService } from 'src/app/services/aquarium.service';
import { Aquarium } from 'src/app/models/Aquarium';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { take } from 'rxjs/operators';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ATOStatus } from 'src/app/models/ATOStatus';
import { PaginationSliver } from 'src/app/models/PaginationSliver';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateWaterParameterModalComponent } from '../../SharedModule/modals/create-water-parameter-modal/create-water-parameter-modal.component';
import { NotificationService } from 'src/app/services/notification.service';
import { CreateWaterChangeModalComponent } from '../../SharedModule/modals/create-water-change-modal/create-water-change-modal.component';
import { CreateWaterDoseModalComponent } from '../../SharedModule/modals/create-water-dose-modal/create-water-dose-modal.component';
import { WaterDosing } from 'src/app/models/WaterDosing';
import { ParameterSelectDateAction } from 'src/app/store/parameter/parameter.actions';
import { ParameterState } from 'src/app/store/parameter/parameter.reducer';
import { getPaginatedATOStatuses, getSelectedDate } from 'src/app/store/parameter/parameter.selector';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'aquarium-parameters',
  templateUrl: './aquarium-parameters.component.html',
  styleUrls: ['./aquarium-parameters.component.scss']
})
export class AquariumParametersComponent implements OnInit {

  public aquarium: Aquarium;
  public pagination: PaginationSliver = new PaginationSliver();
  public dateRange: FormGroup;
  public selectedDate: Observable<ParameterState> = this.store.select(getSelectedDate);



  constructor(public aquariumService: AquariumService,
    public notificationService: ToastrService,
    public dialog: MatDialog,
    public store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.store.select(getSelectedAquarium).pipe(take(1)).subscribe(aq => this.aquarium = aq);
    this.selectedDate.pipe(take(1)).subscribe(state => {
      if (state.pagination) {
        this.pagination = state.pagination;
        this.dateRange = new FormGroup({
          end: new FormControl(new Date(this.pagination.endDate)),
          start: new FormControl(new Date(this.pagination.startDate))
        });
        this.updateFilteredDate();
      }
      else
        this.loadDefaultDate();
    });

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


    //Update the store
    this.store.dispatch(new ParameterSelectDateAction({
      aquariumId: this.aquarium.id,
      pagination: this.pagination
    }));

  }
  private loadDefaultDate() {
    this.pagination.startDate = moment().subtract(30, 'd').utc().startOf('day').format();
    this.pagination.endDate = moment().utc().startOf('day').format();
    this.pagination.descending = true;
    this.pagination.count = 100;
    this.dateRange = new FormGroup({
      end: new FormControl(new Date(this.pagination.endDate)),
      start: new FormControl(new Date(this.pagination.startDate))
    });
    this.store.dispatch(new ParameterSelectDateAction({
      aquariumId: this.aquarium.id,
      pagination: this.pagination
    }));
  }
}
