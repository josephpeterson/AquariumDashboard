import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { AquariumService } from 'src/app/services/aquarium-service/aquarium.service';
import { of } from 'rxjs';
import { SpeciesActions, SpeciesLoadSuccessAction, SpeciesLoadFailAction, SpeciesAddSuccessAction, SpeciesAddFailAction, SpeciesUpdateSuccessAction, SpeciesUpdateFailAction, SpeciesDeleteSuccessAction, SpeciesDeleteFailAction } from './species.actions';
var SpeciesEffects = /** @class */ (function () {
    function SpeciesEffects(aquariumService, actions$) {
        var _this = this;
        this.aquariumService = aquariumService;
        this.actions$ = actions$;
        this.loadAllSpecies$ = this.actions$.pipe(ofType(SpeciesActions.LoadSpecies), mergeMap(function (action) { return _this.aquariumService.getAllSpecies().pipe(map(function (species) { return new SpeciesLoadSuccessAction(species); }), catchError(function (error) { return of(new SpeciesLoadFailAction(error)); })); }));
        this.createSpecies$ = this.actions$.pipe(ofType(SpeciesActions.AddSpecies), map(function (action) { return action.payload; }), mergeMap(function (payload) {
            return _this.aquariumService.createSpecies(payload).pipe(map(
            //We can either return a new AquariumLoadAction, OR just update our store
            function (addedSpecies) {
                return new SpeciesAddSuccessAction(addedSpecies);
            }), catchError(function (err) { return of(new SpeciesAddFailAction(err)); }));
        }));
        this.updateSpecies$ = this.actions$.pipe(ofType(SpeciesActions.UpdateSpecies), map(function (action) { return action.payload; }), mergeMap(function (payload) {
            return _this.aquariumService.updateSpecies(payload).pipe(map(
            //We can either return a new AquariumLoadAction, OR just update our store
            function (updatedSpecies) {
                return new SpeciesUpdateSuccessAction({
                    id: updatedSpecies.id,
                    changes: updatedSpecies
                });
            }), catchError(function (err) { return of(new SpeciesUpdateFailAction(err)); }));
        }));
        this.deleteSpecies$ = this.actions$.pipe(ofType(SpeciesActions.DeleteSpecies), mergeMap(function (action) { return _this.aquariumService.deleteSpecies(action.payload).pipe(map(function () { return new SpeciesDeleteSuccessAction(action.payload); }), catchError(function (error) { return of(new SpeciesDeleteFailAction(error)); })); }));
    }
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], SpeciesEffects.prototype, "loadAllSpecies$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], SpeciesEffects.prototype, "createSpecies$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], SpeciesEffects.prototype, "updateSpecies$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], SpeciesEffects.prototype, "deleteSpecies$", void 0);
    SpeciesEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AquariumService,
            Actions])
    ], SpeciesEffects);
    return SpeciesEffects;
}());
export { SpeciesEffects };
//# sourceMappingURL=species.effect.js.map