import * as tslib_1 from "tslib";
import { Store } from '@ngrx/store';
import { AquariumUpdateAction, AquariumDeleteAction, AquariumResetAction } from 'src/app/store/aquarium/aquarium.actions';
import { Injectable } from '@angular/core';
import { isLoadingAquariums, getConnectionError, getSelectedAquarium, isUpdatingAquarium, isDeletingAquarium, getDeleteError, getDidDelete, getDidUpdate } from 'src/app/store/aquarium/aquarium.selector';
import { AquariumService } from 'src/app/services/aquarium-service/aquarium.service';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
var SettingsComponentData = /** @class */ (function () {
    function SettingsComponentData(store, service, notifier) {
        this.store = store;
        this.service = service;
        this.notifier = notifier;
        this.aquarium = this.store.select(getSelectedAquarium);
        this.loading = this.store.select(isLoadingAquariums);
        this.connectionError = this.store.select(getConnectionError);
        this.updating = this.store.select(isUpdatingAquarium);
        this.updated = this.store.select(getDidUpdate);
        this.deleting = this.store.select(isDeletingAquarium);
        this.deleted = this.store.select(getDidDelete);
        this.deleteError = this.store.select(getDeleteError);
        this.applicationLog = this.service.getApplicationLog();
        this.cameraConfiguration = this.service.getCameraConfiguration();
    }
    SettingsComponentData.prototype.isDetailed = function (aq) {
        return aq.cameraConfiguration != undefined;
    };
    SettingsComponentData.prototype.save = function (aquarium) {
        var _this = this;
        var err = false;
        this.updated.pipe(take(2)).subscribe(function (val) {
            if (val)
                _this.notifier.notify('success', "Changes saved successfully");
        });
        this.store.dispatch(new AquariumUpdateAction(aquarium));
    };
    SettingsComponentData.prototype.delete = function (aquarium) {
        this.store.dispatch(new AquariumDeleteAction(aquarium));
    };
    SettingsComponentData.prototype.reset = function () {
        this.store.dispatch(new AquariumResetAction());
    };
    SettingsComponentData.prototype.applyCameraConfiguration = function (configuration) {
        return this.service.applyCameraConfiguration(configuration).subscribe();
    };
    SettingsComponentData = tslib_1.__decorate([
        Injectable({
            providedIn: "root"
        }),
        tslib_1.__metadata("design:paramtypes", [Store, AquariumService, NotifierService])
    ], SettingsComponentData);
    return SettingsComponentData;
}());
export { SettingsComponentData };
//# sourceMappingURL=settings.component.data.js.map