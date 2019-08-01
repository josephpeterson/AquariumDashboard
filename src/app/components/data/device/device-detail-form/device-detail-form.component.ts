import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { AppState } from 'src/app/app.state';
import { AquariumService } from 'src/app/services/aquarium.service';
import { FormGroup, FormBuilder, Form } from '@angular/forms';
import { Aquarium } from 'src/app/models/Aquarium';
import { MatDialog } from '@angular/material';
import { ConfirmModalComponent } from 'src/app/components/shared/modals/confirm-modal/confirm-modal.component';
import { take } from 'rxjs/operators';
import { faCheckCircle, faDesktop, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ManagePhotoConfigurationModal } from 'src/app/components/shared/modals/manage-photo-configuration/manage-photo-configuration.component';
import { CameraConfiguration } from 'src/app/models/CameraConfiguration';


@Component({
    selector: 'device-detail-form',
    templateUrl: './device-detail-form.component.html',
    styleUrls: ['./device-detail-form.component.scss']
})
export class DeviceDetailFormComponent implements OnInit {
    public editing:boolean = false;
    public device: AquariumDevice;
    public disabled: boolean = false;
    public error: boolean;

    public scanning: boolean = false;

    @Input() aquarium: Aquarium;
    //@Input() deviceId: number;
    @Output() public onSuccess = new EventEmitter();

    @ViewChild("form") form: ElementRef;
    private componentLifeCycle$ = new Subject();
    pinging: boolean;
    faCheck = faCheckCircle;
    public faDevice:IconDefinition = faDesktop;



    constructor(private _aquariumService: AquariumService,
        private notifier: NotifierService,
        private dialog: MatDialog,
    ) {

    }
    ngOnInit() {
        if(this.aquarium.device)
            this.device = {...this.aquarium.device};
            
        
        //if (!this.aquarium && this.deviceId) this.loadDevice(this.deviceId);

        console.log(this.device);
    }

    loadDevice(id: number) {
        return;
        //Load device
        this.disable();
        this._aquariumService.getAquariumDeviceById(0).subscribe((device: AquariumDevice) => {
            this.enable();
            if (this.device) this.device = device;
        })
    }
    ngOnDestory() {
        this.componentLifeCycle$.next();
        this.componentLifeCycle$.unsubscribe();
    }
    actionSuccess() {
        this.onSuccess.emit();
    }

    disable() {
        this.disabled = true;
    }
    enable() {
        this.disabled = false;
    }
    clickCreateDevice() {
        this.disable();
        this._aquariumService.createAquariumDevice(this.device).subscribe(
            (device: AquariumDevice) => {
                console.log("Created: ", device);
                this.device = device;
                this.enable();
                this.editing = false;
            },
            err => {
                this.notifier.notify("error", "Could not create device");
                this.enable();
            }
        );
    }
    clickUpdateDevice() {
        this.disable();
        this._aquariumService.updateAquariumDevice(this.device).subscribe(
            (device: AquariumDevice) => {
                this.device = device;
                this.enable();
                this.editing = false;
            },
            err => {
                this.notifier.notify("error", "Could not update device");
                this.enable();
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
            this.disable();
            this._aquariumService.deleteAquariumDevice(this.device.id).subscribe(
                (device: AquariumDevice) => {
                    this.createNewDevice();
                    this.enable();
                },
                err => {
                    this.notifier.notify("error", "Could not delete device");
                    this.enable();
                }
            )
        });
    }
    clickScanDeviceHardware() {
        this.scanning = true;
        this._aquariumService.scanDeviceHardware(this.device.id).subscribe(
            (device: AquariumDevice) => {
                console.log(device);
                this.device = device;
                this.scanning = false;
            }, err => {
                this.scanning = false;
            })
    }
    clickPingDevice() {
        this.pinging = true;
        this._aquariumService.pingDevice(this.device.id).subscribe(
            () => {
                this.pinging = false;
                this.notifier.notify("success", "Connection to device was successfull");
            }, err => {
                this.pinging = false;
                this.notifier.notify("error", "Could not connect to device");
            })
    }

    createNewDevice() {
        this.device = new AquariumDevice();
        this.device.aquariumId = this.aquarium.id;
    }

    clickManagePhotoModule() {
        this.dialog.open(ManagePhotoConfigurationModal, {
            width: "50%",
            data: this.device
        }).afterClosed().subscribe((device: AquariumDevice) => {
            if(device)
                this.device.cameraConfiguration = device.cameraConfiguration;
        });
    }

    clickEditDevice() {
        this.editing = !this.editing;
    }

    clickConnectDevice() {
        this.device = new AquariumDevice();
        this.device.aquariumId = this.aquarium.id;
        this.editing = true;
    }
    clickCancelEditing() {
        this.editing = false;
        if(this.aquarium.device)
            this.device = {...this.aquarium.device};
        else
            delete this.device;
    }
}