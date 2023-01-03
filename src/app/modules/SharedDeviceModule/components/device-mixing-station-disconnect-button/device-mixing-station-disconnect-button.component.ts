import { Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Store } from "@ngrx/store";
import { AquariumDeviceService } from "../../aquarium-device.service";
import { connectToDevice, disconnectMixingStation } from "../../store/device.actions";

@Component({
    selector: 'device-mixing-station-disconnect-button',
    templateUrl: './device-mixing-station-disconnect-button.component.html',
    styleUrls: []
})
export class DeviceMixingStationDisconnectButtonComponent {
    @Input() disabled: boolean;

    public faTrash = faTrash;
    constructor(private dialog: MatDialog,
        private store: Store,
        private service: AquariumDeviceService) {
    }
    public clickAction() {
        this.service.disconnectMixingStation().subscribe(data => {
            this.store.dispatch(connectToDevice());
            this.store.dispatch(disconnectMixingStation());
            //this.store.dispatch(deviceMixingStationConnectionSuccess(undefined));
        });
    }
}
