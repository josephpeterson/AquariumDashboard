import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subject } from 'rxjs';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { AppState } from 'src/app/app.state';
import { AquariumService } from 'src/app/services/aquarium.service';
import { Aquarium } from 'src/app/models/Aquarium';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { faCheckCircle, faDesktop, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AquariumLoadSuccessAction } from 'src/app/store/aquarium/aquarium.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { RaspberryPiModels } from 'src/app/models/types/RaspberyPiModels';
import { NotificationService } from 'src/app/services/notification.service';
import { ConfirmModalComponent } from 'src/app/modules/SharedDeviceModule/components/modals/confirm-modal/confirm-modal.component';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'device-detail-form',
    templateUrl: './device-detail-form.component.html',
    styleUrls: ['./device-detail-form.component.scss']
})
export class DeviceDetailFormComponent implements OnInit {
    
    @Input() aquarium: Aquarium;
    
    public device: AquariumDevice;
    public disabled:boolean = true;
    public loading:boolean = false;
    public error: HttpErrorResponse;



    //@Input() deviceId: number;
    @Output() public onSuccess = new EventEmitter();

    @ViewChild("form") form: ElementRef;
    private componentLifeCycle$ = new Subject();
    pinging: boolean;
    faCheck = faCheckCircle;
    public faDevice: IconDefinition = faDesktop;
    deviceLog: string;


    public raspberryPiModels = RaspberryPiModels;




    constructor(private _aquariumService: AquariumService,
        private notifier: ToastrService,
        private dialog: MatDialog,
        private store: Store<AppState>
    ) {

    }
    ngOnInit() {
        if (this.aquarium.device)
            this.device = { ...this.aquarium.device };
    }
    ngOnDestory() {
        this.componentLifeCycle$.next();
        this.componentLifeCycle$.unsubscribe();
    }
    actionSuccess() {
        this.onSuccess.emit();
    }
    clickCreateDevice() {
        this.cleanDeviceRequest(this.device);
        this.disabled = true;
        this.loading = true;

        this._aquariumService.createAquariumDevice(this.device).subscribe(
            (device: AquariumDevice) => {
                this.device = device;
                this.loading = false;

                this.aquarium.device = device;
                this.store.dispatch(new AquariumLoadSuccessAction([this.aquarium]));
            },
            () => {
                this.notifier.error( "Could not create device");
                this.loading = false;
            }
        );
    }

    //todo maybe move this to api validation
    private cleanDeviceRequest(device: AquariumDevice) {
        //Clean IP address
        device.address = device.address.replace(/http:\/\//g, "");
        device.address = device.address.replace(/https:\/\//g, "");
        if (!device.port) {
            if (device.address.split(":").length > 1) {
                device.port = device.address.split(":")[1];
                device.address = device.address.split(":")[0];
            }
            else
                device.port = "80";
        }
    }
    clickUpdateDevice() {
        this.cleanDeviceRequest(this.device);
        this.disabled = true;
        this.loading = true;

        this._aquariumService.updateAquariumDevice(this.device).subscribe(
            (device: AquariumDevice) => {
                this.device = device;
                this.aquarium.device = device;
                this.loading = false;
                this.store.dispatch(new AquariumLoadSuccessAction([this.aquarium]));
            },
            err => {
                this.notifier.error( "Could not update device");
                this.loading = false;
                this.error = err;
            }
        )
    }
    clickDeleteDevice() {
        var dialog = this.dialog.open(ConfirmModalComponent, {
        });
        dialog.componentInstance.title = "Delete Device";
        dialog.componentInstance.body = "Are you sure you want to remove this device from this aquarium? You will no longer be able to monitor your aquarium.";
        dialog.afterClosed().pipe(take(1)).subscribe((confirm: boolean) => {
            if (!confirm) return;
            this.disabled = true;
            this.loading = true;
            this._aquariumService.deleteAquariumDevice(this.device.id).subscribe(
                () => {
                    this.loading = false;
                    delete this.aquarium.device;
                    this.store.dispatch(new AquariumLoadSuccessAction([this.aquarium]));
                },
                err => {
                    this.notifier.error( "Could not delete device");
                    this.disabled = false;
                    this.loading = false;
                    this.error = err;
                }
            )
        });
    }
    clickPingDevice() {
        this.pinging = true;
        this._aquariumService.pingDevice(this.device.id).subscribe(
            () => {
                this.pinging = false;
                this.notifier.success( "Connection to device was successfull");
            }, () => {
                this.pinging = false;
                this.notifier.error( "Could not connect to device");
            })
    }
    clickEditDevice() {
        this.disabled = false;
    }

    clickCancelEditing() {
        this.disabled = true;
        if (this.aquarium.device)
            this.device = { ...this.aquarium.device };
        else
            delete this.device;
    }
    clickConnectNewDevice() {
        this.device = new AquariumDevice();
        this.device.aquariumId = this.aquarium.id;
        this.disabled = false;
    }
}