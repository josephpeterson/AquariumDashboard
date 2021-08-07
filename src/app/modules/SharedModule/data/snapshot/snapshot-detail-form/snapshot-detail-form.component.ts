import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subject } from 'rxjs';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { AppState } from 'src/app/app.state';
import { AquariumService } from 'src/app/services/aquarium.service';
import { FormGroup, FormBuilder, Form } from '@angular/forms';
import { Aquarium } from 'src/app/models/Aquarium';
import { MatDialog } from '@angular/material';
import { take } from 'rxjs/operators';
import { faCheckCircle, faDesktop, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CameraConfiguration } from 'src/app/models/CameraConfiguration';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { AttachmentUploaderComponent } from '../../../attachment-uploader/attachment-uploader.component';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
    selector: 'snapshot-detail-form',
    templateUrl: './snapshot-detail-form.component.html',
    styleUrls: ['./snapshot-detail-form.component.scss']
})
export class SnapshotDetailComponent implements OnInit {
    public editing:boolean = false;
    public device: AquariumDevice;
    public disabled: boolean = false;
    public error: boolean;

    public scanning: boolean = false;

    @Input() snapshot: AquariumSnapshot;
    //@Input() deviceId: number;
    @Output() public onSuccess = new EventEmitter();

    @ViewChild("form") form: ElementRef;
    private componentLifeCycle$ = new Subject();
    pinging: boolean;
    faCheck = faCheckCircle;
    public faDevice:IconDefinition = faDesktop;

    @ViewChild(AttachmentUploaderComponent) attachmentComponent: AttachmentUploaderComponent;




    constructor(public aquariumService: AquariumService,
        private notifier: NotificationService,
        private dialog: MatDialog,
    ) {

    }
    ngOnInit() {
        if(this.snapshot)
            this.snapshot = {...this.snapshot};
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

    getAttachment() {
        return this.attachmentComponent.getAttachment();
    }
}