import { Component, OnInit } from '@angular/core';
import { AquariumService } from 'src/app/services/aquarium.service';

import { DeviceScheduledJob } from 'src/app/modules/SharedDeviceModule/models/DeviceScheduledJob';
import { DeviceInformation } from 'src/app/modules/SharedDeviceModule/models/DeviceInformation';
import { DeviceConnectionStatus } from "src/app/models/types/DeviceConnectionStatus";
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { getDeviceConnectionStatus, getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { Aquarium } from 'src/app/models/Aquarium';
import { PaginationSliver } from 'src/app/models/PaginationSliver';
import { ActivatedRoute } from '@angular/router';
import { selectDeviceInformation } from 'src/app/modules/SharedDeviceModule/store/device.selectors';

@Component({
  selector: 'device-scheduled-job-card',
  templateUrl: './device-scheduled-job-card.component.html',
  //styleUrls: ['./device-scheduled-job-card.component.scss']
})
export class DeviceScheduledJobCardComponent implements OnInit {

  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);
  public deviceInformation$: Observable<DeviceInformation> = this.store.select(selectDeviceInformation);
  public deviceConnectionStatus$: Observable<DeviceConnectionStatus> = this.store.select(getDeviceConnectionStatus);
  public completedScheduledJobs$: Subject<DeviceScheduledJob[]> = new Subject<DeviceScheduledJob[]>();
  DeviceConnectionStatus = DeviceConnectionStatus;
  public deviceInformation: DeviceInformation;
  public tab: CardTab = CardTab.Scheduled;
  public CardTab = CardTab;

  constructor(public _aquariumService: AquariumService,
    private route: ActivatedRoute,
    private store: Store) { }
  public ngOnInit(): void {
    this.loadScheduledJobHistory();

    this.route.queryParams
      .subscribe(params => {
        this.tab = params.jobs;
      }
    );
  }
  public loadScheduledJobHistory() {
    this.aquarium$.subscribe(aq => {
      var d = aq.device;
      var pagination = new PaginationSliver();
      pagination.count = 10;
      pagination.descending = true;
      this._aquariumService.getAllScheduledJobs(d.id, pagination).subscribe(scheduledJobs => {
        if (scheduledJobs)
          this.completedScheduledJobs$.next(scheduledJobs);
      })
    });
  }
  public clickCardTab(tab: CardTab) {
    this.loadScheduledJobHistory();
    this.tab = tab;
  }
  public isTabActive(checkTab: CardTab) {
    if(!this.tab && checkTab == CardTab.Scheduled)
      return true;
    return this.tab == checkTab;
  }
}
enum CardTab {
  Scheduled,
  Completed
}