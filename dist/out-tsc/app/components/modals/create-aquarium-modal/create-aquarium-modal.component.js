import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { CreateAquariumModalComponentData } from './create-aquarium-model.component.data';
import { MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
var CreateAquariumModelComponent = /** @class */ (function () {
    function CreateAquariumModelComponent(data, dialogRef) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.loading = this.data.loading;
        this.createError = this.data.createError;
        this.connectionError = this.data.connectionError;
        this.aquariumDate = new FormControl(new Date());
        dialogRef.disableClose = true;
        this.data.reset();
    }
    CreateAquariumModelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data.wasCreated.subscribe(function (success) {
            if (success)
                _this.dialogRef.close();
        });
    };
    CreateAquariumModelComponent.prototype.createAquarium = function () {
        var aq = new Aquarium();
        aq.name = this.aquariumName;
        aq.startDate = this.aquariumDate.value;
        aq.gallons = this.aquariumSize;
        aq.type = this.aquariumType;
        this.data.create(aq);
    };
    CreateAquariumModelComponent = tslib_1.__decorate([
        Component({
            selector: 'create-aquarium-modal',
            templateUrl: './create-aquarium-modal.component.html',
            styleUrls: ['./create-aquarium-modal.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [CreateAquariumModalComponentData,
            MatDialogRef])
    ], CreateAquariumModelComponent);
    return CreateAquariumModelComponent;
}());
export { CreateAquariumModelComponent };
//# sourceMappingURL=create-aquarium-modal.component.js.map