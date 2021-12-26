import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AquariumService } from 'src/app/services/aquarium.service';
import { Aquarium } from 'src/app/models/Aquarium';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getDeployedDeviceInformation, getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { Observable } from 'rxjs';
import { DeviceInformation } from 'src/app/models/DeviceInformation';
@Component({
  selector: 'device-schedule',
  templateUrl: './device-schedule.component.html',
  //styleUrls: ['./device-schedule.component.scss']
})
export class DeviceScheduleComponent implements OnInit {
  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);
  public deviceInformation$: Observable<DeviceInformation> = this.store.select(getDeployedDeviceInformation);
  constructor(public aquariumService: AquariumService,
    public dialog: MatDialog,
    public store: Store<AppState>
  ) { }
  ngOnInit() {
  }
}
