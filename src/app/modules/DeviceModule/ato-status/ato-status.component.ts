import { Component, OnInit, Input } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { NotifierService } from 'angular-notifier';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';
import { ManagePhotoConfigurationModal } from 'src/app/modules/SharedModule/modals/manage-photo-configuration/manage-photo-configuration.component';
import { ATOStatus } from 'src/app/models/ATOStatus';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'device-ato-status',
  templateUrl: './ato-status.component.html',
  styleUrls: ['./ato-status.component.scss']
})
export class DeviceATOStatusComponent implements OnInit {

  @Input("aquarium") public aquarium: Aquarium;
  scanning: boolean;

  faCheck = faCheckCircle;
  pinging: boolean;

  public atoStatus: ATOStatus;
  public loading: boolean = false;


  public atoRecommended:boolean = true;

  constructor(public _aquariumService: AquariumService,
    public notifier: NotifierService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loading = true;
    this._aquariumService.getDeviceATOStatus(this.aquarium.device.id).subscribe(status => {
      this.atoStatus = status;
      this.loading = false;
      console.log(status);
      this.test();
    },(err:HttpErrorResponse) => {
      this.loading = false;
    })
  }
  public test() {
    var s = new ATOStatus();
    s.pumpRunning = true;

    this.atoStatus = s;
  }
  public parseDate(date: string) {
    return moment(date).local().calendar();
  }
}
