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
import $ from 'jquery';
import { AttachmentUploaderComponent } from '../../../attachment-uploader/attachment-uploader.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'snapshot-detail-chart',
    templateUrl: './snapshot-detail-chart.component.html',
    styleUrls: ['./snapshot-detail-chart.component.scss']
})
export class SnapshotDetailChartComponent implements OnInit {
    public editing: boolean = false;
    public device: AquariumDevice;
    public disabled: boolean = false;
    public error: boolean;

    public scanning: boolean = false;

    @Input() snapshot: AquariumSnapshot;
    //@Input() deviceId: number;
    @Output() public onSuccess = new EventEmitter();

    @ViewChild("form",{static: false}) form: ElementRef;
    private componentLifeCycle$ = new Subject();
    pinging: boolean;
    faCheck = faCheckCircle;
    public faDevice: IconDefinition = faDesktop;

    @ViewChild(AttachmentUploaderComponent,{static: false}) attachmentComponent: AttachmentUploaderComponent;
    @ViewChild("phColumn",{static: false}) phColumn: ElementRef;




    constructor(public aquariumService: AquariumService,
        private notifier: NotificationService,
        private dialog: MatDialog,
    ) {

    }
    ngOnInit() {
        if (this.snapshot)
            this.snapshot = { ...this.snapshot };
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

    clickPhRow(event) {
        var ele = $(event.target);
        if (ele.hasClass("active")) {
            $("#phColumn").find("span").removeClass("disabled");
            $("#highPhColumn").find("span").removeClass("disabled");
            ele.removeClass("active");
            this.snapshot.ph = undefined;
            return;
        }
        $("#phColumn").find("span").addClass("disabled").removeClass("active");
        $("#highPhColumn").find("span").addClass("disabled").removeClass("active");
        ele.removeClass("disabled").addClass("active");
        this.snapshot.ph = parseFloat(ele.text().split(" ")[0]);
    }
    clickAmmoniaRow(event) {
        var ele = $(event.target);
        if (ele.hasClass("active")) {
            $("#ammoniaColumn").find("span").removeClass("disabled");
            ele.removeClass("active");
            this.snapshot.ammonia = undefined;
            return;
        }
        $("#ammoniaColumn").find("span").addClass("disabled").removeClass("active");
        ele.removeClass("disabled").addClass("active");
        this.snapshot.ammonia = parseFloat(ele.text().split(" ")[0]);
    }
    clickNitriteRow(event) {
        var ele = $(event.target);
        if (ele.hasClass("active")) {
            $("#nitriteColumn").find("span").removeClass("disabled");
            ele.removeClass("active");
            this.snapshot.nitrite = undefined;
            return;
        }
        $("#nitriteColumn").find("span").addClass("disabled").removeClass("active");
        ele.removeClass("disabled").addClass("active");
        this.snapshot.nitrite = parseFloat(ele.text().split(" ")[0]);
    }
    clickNitrateRow(event) {
        var ele = $(event.target);
        if (ele.hasClass("active")) {
            $("#nitrateColumn").find("span").removeClass("disabled");
            ele.removeClass("active");
            this.snapshot.nitrate = undefined;
            return;
        }
        $("#nitrateColumn").find("span").addClass("disabled").removeClass("active");
        ele.removeClass("disabled").addClass("active");
        this.snapshot.nitrate = parseFloat(ele.text().split(" ")[0]);
    }
}