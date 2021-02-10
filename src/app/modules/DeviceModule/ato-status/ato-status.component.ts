import { Component, OnInit, Input } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { NotifierService } from 'angular-notifier';
import { faCheck, faCheckCircle, faRedo, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';
import { ManagePhotoConfigurationModal } from 'src/app/modules/SharedModule/modals/manage-photo-configuration/manage-photo-configuration.component';
import { ATOStatus } from 'src/app/models/ATOStatus';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { RunATOModalComponent } from '../../SharedModule/modals/run-ato-modal/run-ato-modal.component';
import { PaginationSliver } from 'src/app/models/PaginationSliver';

@Component({
  selector: 'device-ato-status',
  templateUrl: './ato-status.component.html',
  styleUrls: ['./ato-status.component.scss']
})
export class DeviceATOStatusComponent implements OnInit {

  @Input("aquarium") public aquarium: Aquarium;
  scanning: boolean;

  faCheckCircle = faCheckCircle;
  faRedo = faRedo;
  faCheck = faCheck;
  faTimes = faTimes;
  faSpinner = faSpinner;

  pinging: boolean;

  public atoStatus: ATOStatus;
  public atoHistory: ATOStatus[];

  public loading: boolean = false;

  public currentATOProgress: number;
  public updateTick;
  public pagination:PaginationSliver = new PaginationSliver();


  public atoRecommended: boolean = true;

  constructor(public _aquariumService: AquariumService,
    public notifier: NotifierService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.pagination.descending = true;
    this.pagination.count = 5;

    this.loadStatus();
    this.loadATOHistory();
    this.updateTick = setInterval(() => this.updateATOProgress(), 100);
  }
  ngOnDestroy(): void {
    clearInterval(this.updateTick);
  }
  public loadStatus() {
    this.loading = true;
    this._aquariumService.getDeviceATOStatus(this.aquarium.device.id).subscribe(status => {
      this.atoStatus = status;
      this.loading = false;
      console.log(status);
      //this.test();
    }, (err: HttpErrorResponse) => {
      this.loading = false;
    })
  }
  public parseDate(date: string) {
    return moment(date).local().calendar();
  }
  public parseDateHistory(date: string,timeOnly:boolean = false) {
    if(!date)
      return "--:--";
    if(timeOnly)
    {
      return moment(date).local().format('h:mm a');
    }
    
    return moment(date).local().calendar();
  }
  public readableDuration(timespan: string) {
    return moment.duration(timespan).humanize();
  }
  public computeTimeDifference(atoStatus:ATOStatus) {
    var actual = moment(atoStatus.actualEndTime);
    var est = moment(atoStatus.estimatedEndTime);
    var s = moment.duration(actual.diff(est)).asSeconds();
    return Math.ceil(s);
  }
  public getRunTime(atoStatus:ATOStatus) {
    var actual = moment(atoStatus.startTime);
    var end = moment(atoStatus.actualEndTime);
    var s = moment.duration(actual.diff(end)).humanize();
    return s;
  }
  public updateATOProgress() {
    var ato = this.atoStatus;
    if (!ato)
      return;
    var start = Date.parse(ato.startTime);
    var estEnd = Date.parse(ato.estimatedEndTime);
    var current = Date.now();

    var totalMs = ato.maxRuntime * 60 * 1000;
    var passedMs = current - start;
    this.currentATOProgress = Math.floor(passedMs / totalMs * 10000) / 100;
  }
  public clickRunATO() {

    this.dialog.open(RunATOModalComponent, {
    }).afterClosed().subscribe((res) => {
      if (res.run) {
        this.loading = true;
        this._aquariumService.runDeviceATO(this.aquarium.device.id, parseInt(res.runtime)).subscribe(status => {
          this.atoStatus = status;
          this.loading = false;
        }, (err: HttpErrorResponse) => {
          this.loading = false;
        });
      }
    });
  }
  public clickStopATO() {
    this.loading = true;
    this._aquariumService.stopDeviceATO(this.aquarium.device.id).subscribe(status => {
      this.atoStatus = status;
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.loading = false;
    })
  }
  public clickRefresh() {
    this.loadStatus();
  }
  public loadATOHistory() {
    this._aquariumService.getDeviceATOHistory(this.aquarium.device.id,this.pagination).subscribe(atoHistory => {
      this.atoHistory = atoHistory;
      //this.loading = false;
    }, (err: HttpErrorResponse) => {
      //this.loading = false;
    })
  }
}
