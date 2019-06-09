import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { AquariumService } from 'src/app/services/aquarium-service/aquarium.service';
import { of } from 'rxjs';
import { SnapshotActions, SnapshotLoadSuccessAction, SnapshotLoadFailedAction, SnapshotDeleteSuccessAction, SnapshotDeleteFailedAction, SnapshotTakeSuccessAction, SnapshotTakeFailedAction } from './snapshot.actions';
var SnapshotEffects = /** @class */ (function () {
    function SnapshotEffects(aquariumService, actions$) {
        var _this = this;
        this.aquariumService = aquariumService;
        this.actions$ = actions$;
        this.loadSnapshotsByAquarium$ = this.actions$.pipe(ofType(SnapshotActions.LoadByAquarium), mergeMap(function (action) { return _this.aquariumService.getSnapshots(action.payload).pipe(map(function (snapshots) { return new SnapshotLoadSuccessAction(snapshots); }), catchError(function (error) { return of(new SnapshotLoadFailedAction(error)); })); }));
        this.deleteSnapshot$ = this.actions$.pipe(ofType(SnapshotActions.Delete), mergeMap(function (action) { return _this.aquariumService.deleteSnapshot(action.payload).pipe(map(function () { return new SnapshotDeleteSuccessAction(action.payload); }), catchError(function (error) { return of(new SnapshotDeleteFailedAction(error)); })); }));
        this.takeSnapshot$ = this.actions$.pipe(ofType(SnapshotActions.Take), mergeMap(function (action) { return _this.aquariumService.takeSnapshot(action.payload.id).pipe(map(function (newSnapshot) {
            //We can map the aquarium to the snapshot here
            newSnapshot.aquarium = action.payload;
            return new SnapshotTakeSuccessAction(newSnapshot);
        }), catchError(function (error) { return of(new SnapshotTakeFailedAction(error)); })); }));
    }
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], SnapshotEffects.prototype, "loadSnapshotsByAquarium$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], SnapshotEffects.prototype, "deleteSnapshot$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], SnapshotEffects.prototype, "takeSnapshot$", void 0);
    SnapshotEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AquariumService,
            Actions])
    ], SnapshotEffects);
    return SnapshotEffects;
}());
export { SnapshotEffects };
//# sourceMappingURL=snapshot.effect.js.map