import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DeviceSensor } from "src/app/modules/SharedDeviceModule/models/DeviceSensor";
import { NotificationService } from "src/app/services/notification.service";
import { AquariumDeviceService } from "../../aquarium-device.service";
import { DeviceConfiguration } from "../../models/DeviceConfiguration";

@Component({
  selector: 'device-schedule-list',
  templateUrl: './device-schedule-list.component.html',
  styleUrls: []
})
export class DeviceScheduleListComponent implements OnInit {

  @Input() public configuredDevice: DeviceConfiguration;

  public loading: boolean = false;
  public error: string;
  public sensors: DeviceSensor[];
  public disabled: boolean = false;

  public readableTypes = new Subject<any>();

  constructor(private service: AquariumDeviceService,
    public notifier: ToastrService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }
  getSensorReadableType(types, type: string) {
    if (!types) return "------";
    for (var i = 0; i < types.length; i++) {
      var t = types[i];
      if (t.value == type)
        return t.key;
    }
    return "Unknown";
  }
}