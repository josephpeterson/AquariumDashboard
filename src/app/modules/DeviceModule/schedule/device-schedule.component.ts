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
import { AquariumDevice } from 'src/app/models/AquariumDevice';


@Component({
  selector: 'device-schedule',
  templateUrl: './device-schedule.component.html',
  styleUrls: ['./device-schedule.component.scss']
})
export class DeviceScheduleComponent implements OnInit {
  public aquarium: Aquarium;
  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);
  public device: AquariumDevice;
  deviceLog: any;

  constructor(public aquariumService: AquariumService,
    public dialog: MatDialog,
    public store: Store<AppState>
  ) { }
  ngOnInit() {
    this.aquarium$.pipe(take(1)).subscribe(aq => {
      this.aquarium = aq
      this.aquariumService.getAquariumDeviceById(aq.device.id).pipe(take(1)).subscribe(d => {
        this.device = d;
        d.aquarium = aq;
      });
    });
  }
}
