import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { AquariumActions, AquariumLoadSuccessAction, AquariumLoadFailAction, AquariumUpdateSuccessAction, AquariumUpdateFailAction, AquariumCreateSuccessAction, AquariumCreateFailAction, AquariumDeleteSuccessAction, AquariumDeleteFailAction, AquariumAddFishSuccessAction, AquariumAddFishFailAction, AquariumUpdateFishSuccessAction, AquariumUpdateFishFailAction, AquariumDeleteFishSuccessAction, AquariumDeleteFishFailAction } from './aquarium.actions';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { AquariumService } from 'src/app/services/aquarium-service/aquarium.service';
import { of } from 'rxjs';
var AquariumEffects = /** @class */ (function () {
    function AquariumEffects(aquariumService, actions$) {
        var _this = this;
        this.aquariumService = aquariumService;
        this.actions$ = actions$;
        this.loadAquariums$ = this.actions$.pipe(ofType(AquariumActions.Load), mergeMap(function () { return _this.aquariumService.getAquariums().pipe(map(function (aquariums) { return new AquariumLoadSuccessAction(aquariums); }), catchError(function (error) { return of(new AquariumLoadFailAction(error)); })); }));
        this.loadAquariumDetailed$ = this.actions$.pipe(ofType(AquariumActions.MakeSelection), map(function (action) { return action.aquariumId; }), mergeMap(function (aquariumId) {
            return _this.aquariumService.getAquariumById(aquariumId).pipe(map(
            //We can either return a new AquariumLoadAction, OR just update our store
            function (detailedAquarium) {
                return new AquariumLoadSuccessAction([detailedAquarium]);
            }), catchError(function (err) { return of(new AquariumLoadFailAction(err)); }));
        }));
        this.updateAquarium$ = this.actions$.pipe(ofType(AquariumActions.Update), map(function (action) { return action.aquarium; }), mergeMap(function (aquarium) {
            return _this.aquariumService.updateAquarium(aquarium).pipe(map(
            //We can either return a new AquariumLoadAction, OR just update our store
            function (newAquarium) {
                return new AquariumUpdateSuccessAction({
                    id: newAquarium.id,
                    changes: newAquarium
                });
            }), catchError(function (err) { return of(new AquariumUpdateFailAction(err)); }));
        }));
        this.createAquarium$ = this.actions$.pipe(ofType(AquariumActions.Create), map(function (action) { return action.payload; }), mergeMap(function (payload) {
            return _this.aquariumService.createAquarium(payload).pipe(map(
            //We can either return a new AquariumLoadAction, OR just update our store
            function (newAquarium) {
                return new AquariumCreateSuccessAction(newAquarium);
            }), catchError(function (err) { return of(new AquariumCreateFailAction(err)); }));
        }));
        this.deleteAquarium$ = this.actions$.pipe(ofType(AquariumActions.Delete), map(function (action) { return action.payload; }), mergeMap(function (payload) {
            return _this.aquariumService.deleteAquarium(payload).pipe(map(function () { return new AquariumDeleteSuccessAction(payload); }), catchError(function (err) { return of(new AquariumDeleteFailAction(err)); }));
        }));
        this.addFishToAquarium$ = this.actions$.pipe(ofType(AquariumActions.AddFish), map(function (action) { return action.payload; }), mergeMap(function (payload) {
            return _this.aquariumService.createFish(payload).pipe(map(
            //We can either return a new AquariumLoadAction, OR just update our store
            function (addedFish) {
                return new AquariumAddFishSuccessAction(addedFish);
            }), catchError(function (err) { return of(new AquariumAddFishFailAction(err)); }));
        }));
        this.updateFish$ = this.actions$.pipe(ofType(AquariumActions.UpdateFish), map(function (action) { return action.payload; }), mergeMap(function (payload) {
            return _this.aquariumService.updateFish(payload).pipe(map(
            //We can either return a new AquariumLoadAction, OR just update our store
            function (addedFish) {
                return new AquariumUpdateFishSuccessAction(addedFish);
            }), catchError(function (err) { return of(new AquariumUpdateFishFailAction(err)); }));
        }));
        this.deleteFish$ = this.actions$.pipe(ofType(AquariumActions.DeleteFish), map(function (action) { return action.payload; }), mergeMap(function (payload) {
            return _this.aquariumService.deleteFish(payload).pipe(map(function () { return new AquariumDeleteFishSuccessAction({
                id: payload.id,
                changes: null
            }); }), catchError(function (err) { return of(new AquariumDeleteFishFailAction(err)); }));
        }));
    }
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AquariumEffects.prototype, "loadAquariums$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AquariumEffects.prototype, "loadAquariumDetailed$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AquariumEffects.prototype, "updateAquarium$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AquariumEffects.prototype, "createAquarium$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AquariumEffects.prototype, "deleteAquarium$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AquariumEffects.prototype, "addFishToAquarium$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AquariumEffects.prototype, "updateFish$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AquariumEffects.prototype, "deleteFish$", void 0);
    AquariumEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AquariumService,
            Actions])
    ], AquariumEffects);
    return AquariumEffects;
}());
export { AquariumEffects };
//# sourceMappingURL=aquarium.effect.js.map