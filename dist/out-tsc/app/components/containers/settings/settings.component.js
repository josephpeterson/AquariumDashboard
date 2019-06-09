import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Aquarium } from 'src/app/models/Aquarium';
import { SettingsComponentData } from './settings.component.data';
import { ConfirmModalComponent } from '../../modals/confirm-modal/confirm-modal.component';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { CameraConfiguration, CameraExposureModes } from 'src/app/models/CameraConfiguration';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(data, dialog, router) {
        this.data = data;
        this.dialog = dialog;
        this.router = router;
        this.date = new FormControl(new Date());
        this.serializedDate = new FormControl((new Date()).toISOString());
        this.aquarium$ = this.data.aquarium;
        this.componentLifeCycle = new Subject();
        this.updating = this.data.updating;
        this.cameraConfig = new CameraConfiguration();
        this.deleting = this.data.deleting;
        this.deleteError = this.data.deleteError;
        this.faSpinner = faSpinner;
        this.applicationLog$ = this.data.applicationLog;
        this.exposureModes = CameraExposureModes;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.aquarium$.pipe(takeUntil(this.componentLifeCycle)).subscribe(function (aq) {
            if (!aq)
                return;
            _this.aquarium = aq;
            _this.aquariumSize = aq.gallons;
            _this.aquariumName = aq.name.trim();
            _this.aquariumType = aq.type.trim();
            if (aq.cameraConfiguration)
                _this.cameraConfig = aq.cameraConfiguration;
        });
        this.data.deleted.subscribe(function (val) {
            if (val)
                _this.data.reset();
        });
    };
    SettingsComponent.prototype.ngOnDestroy = function () {
        this.componentLifeCycle.next();
        this.componentLifeCycle.unsubscribe();
    };
    SettingsComponent.prototype.saveChanges = function () {
        var newAquarium = new Aquarium();
        newAquarium = tslib_1.__assign({}, newAquarium, { id: this.aquarium.id, startDate: this.date.value, gallons: this.aquariumSize, type: this.aquariumType.trim(), name: this.aquariumName.trim(), cameraConfiguration: this.cameraConfig });
        this.data.save(newAquarium);
    };
    SettingsComponent.prototype.resetDefault = function () {
        this.cameraConfig = new CameraConfiguration();
    };
    SettingsComponent.prototype.aquariumExport = function () {
    };
    SettingsComponent.prototype.aquariumDelete = function () {
        var _this = this;
        var dialog = this.dialog.open(ConfirmModalComponent, {});
        dialog.componentInstance.title = "Delete Aquarium";
        dialog.componentInstance.body = "Are you sure you would like to delete this aquarium?";
        dialog.afterClosed().pipe(take(1)).subscribe(function (confirm) {
            if (confirm) {
                _this.data.delete(_this.aquarium);
            }
        });
    };
    SettingsComponent.prototype.snapshotManage = function () {
    };
    SettingsComponent.prototype.snapshotDeleteAll = function () {
    };
    SettingsComponent = tslib_1.__decorate([
        Component({
            selector: 'settings-page-component',
            templateUrl: './settings.component.html',
            styleUrls: ['./settings.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [SettingsComponentData, MatDialog, Router])
    ], SettingsComponent);
    return SettingsComponent;
}());
export { SettingsComponent };
//# sourceMappingURL=settings.component.js.map