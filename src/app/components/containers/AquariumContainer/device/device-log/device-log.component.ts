import { Component, OnInit, Input } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { NotifierService } from 'angular-notifier';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'device-log',
  templateUrl: './device-log.component.html',
  styleUrls: ['./device-log.component.scss']
})
export class DeviceLogComponent implements OnInit {

  @Input("device") device: AquariumDevice;
  deviceLog: any;


  public filters = [
    {
      name: "Information",
      match: "INFO",
      value: false
    },
    {
      name: "Errors",
      match: "ERROR",
      value: true
    },
    {
      name: "Warnings",
      match: "WARN",
      value: true
    }
  ]
  
  constructor(public _aquariumService: AquariumService, public notifier: NotifierService) { }

  ngOnInit() {
  }

  clickGetDeviceLog() {
    if(!this.device)
      return;
    delete this.deviceLog;
    this._aquariumService.getDeviceLog(this.device.id).subscribe(data => {
      this.deviceLog = data;
    }, err => {
      console.log(err);
    });
  }


  getFilteredLog() {
    if(!this.deviceLog)
      return;
    var appliedFilters = [];
    for(var i in this.filters) {
      var filter = this.filters[i];
      if(filter.value)
        appliedFilters.push(`(${filter.match})`);
    }
    if(!appliedFilters.length)
      return;
    var filterstr = appliedFilters.join("|");
    var reg = '^.*(\\|(' + filterstr + ').*$)';
    var regex = new RegExp(reg,'gm');
    var matches = this.deviceLog.match(regex);
    if(matches)
      return matches.join("\n");
  }
}
