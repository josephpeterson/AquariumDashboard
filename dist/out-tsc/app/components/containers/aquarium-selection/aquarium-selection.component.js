import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorMessageModalComponent } from '../../modals/error-message-modal/error-message-modal.component';
import { ConnectionError } from 'src/app/models/ConnectionError';
import { AquariumSelectionComponentData } from './aquarium-selection.component.data';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CreateAquariumModelComponent } from '../../modals/create-aquarium-modal/create-aquarium-modal.component';
import { take } from 'rxjs/operators';
var AquariumSelectionComponent = /** @class */ (function () {
    function AquariumSelectionComponent(data, dialog) {
        this.data = data;
        this.dialog = dialog;
        this.aquariums = this.data.aquariums;
        this.loading = this.data.loading;
        this.connectionError = this.data.connectionError;
        this.autoload = true;
        //Font-Awesome Icons
        this.faCoffee = faPlus;
    }
    AquariumSelectionComponent.prototype.ngOnInit = function () {
        if (this.autoload)
            this.loadAquariums();
        //this.displayCreateAquariumDialog();
    };
    AquariumSelectionComponent.prototype.displayErrorDialog = function (error) {
        var dialog = this.dialog.open(ErrorMessageModalComponent, {}).componentInstance;
        dialog.error = new ConnectionError(error);
    };
    AquariumSelectionComponent.prototype.selectAquarium = function (aquarium) {
        this.data.select(aquarium);
    };
    AquariumSelectionComponent.prototype.loadAquariums = function () {
        var _this = this;
        this.data.load();
        this.connectionError.pipe(take(2)).subscribe(function (error) {
            if (error)
                _this.displayErrorDialog(error);
        });
    };
    AquariumSelectionComponent.prototype.displayCreateAquariumDialog = function () {
        var dialog = this.dialog.open(CreateAquariumModelComponent, {
            width: "40%"
        });
        dialog.componentInstance.aquariumSize = 10;
        dialog.componentInstance.aquariumType = "Normal";
        dialog.afterClosed().pipe(take(1)).subscribe(function () {
            //this.data.load(); //Shouldn't have to do this if we just add to the store
        });
        //dialog.error = new ConnectionError(error);
    };
    tslib_1.__decorate([
        Input("autoload"),
        tslib_1.__metadata("design:type", Boolean)
    ], AquariumSelectionComponent.prototype, "autoload", void 0);
    AquariumSelectionComponent = tslib_1.__decorate([
        Component({
            selector: 'aquarium-selection-component',
            templateUrl: './aquarium-selection.component.html',
            styleUrls: ['./aquarium-selection.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [AquariumSelectionComponentData, MatDialog])
    ], AquariumSelectionComponent);
    return AquariumSelectionComponent;
}());
export { AquariumSelectionComponent };
//# sourceMappingURL=aquarium-selection.component.js.map