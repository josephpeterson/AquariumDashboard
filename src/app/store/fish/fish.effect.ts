import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { map, catchError, mergeMap } from 'rxjs/operators'
import { AquariumService } from 'src/app/services/aquarium-service/aquarium.service';
import { of } from 'rxjs'
import { Snapshot } from 'src/app/models/Snapshot';
import { FishLoadByAquariumIdAction, FishActions, FishLoadSuccessAction, FishLoadFailAction, FishAddAction, FishAddSuccessAction, FishAddFailAction, FishUpdateAction, FishUpdateSuccessAction, FishUpdateFailAction, FishDeleteAction, FishDeleteSuccessAction, FishDeleteFailAction } from './fish.actions';
import { Fish } from 'src/app/models/Fish';
import { Update } from '@ngrx/entity';

@Injectable()
export class FishEffects {
    constructor(private aquariumService: AquariumService,
        private actions$: Actions) {

    }

    @Effect()
    loadFishByAquariumId$ = this.actions$.pipe(ofType<FishLoadByAquariumIdAction>(FishActions.LoadFishByAquariumId),
        mergeMap((action: FishLoadByAquariumIdAction) => this.aquariumService.getFishByAquariumId(action.payload).pipe(
            map((Fish: Fish[]) => new FishLoadSuccessAction(Fish)),
            catchError(error => of(new FishLoadFailAction(error)))
        )));
    @Effect()
    createFish$ = this.actions$.pipe(
        ofType<FishAddAction>(
            FishActions.AddFish
        ),
        map((action: FishAddAction) => action.payload),
        mergeMap((payload: Fish) =>
            this.aquariumService.createFish(payload).pipe(
                map(
                    //We can either return a new AquariumLoadAction, OR just update our store
                    (addedFish: Fish) =>
                        new FishAddSuccessAction(addedFish)
                ),
                catchError(err => of(new FishAddFailAction(err)))
            )
        )
    );
    @Effect()
    updateFish$ = this.actions$.pipe(
        ofType<FishUpdateAction>(
            FishActions.UpdateFish
        ),
        map((action: FishUpdateAction) => action.payload),
        mergeMap((payload: Fish) =>
            this.aquariumService.updateFish(payload).pipe(
                map(
                    //We can either return a new AquariumLoadAction, OR just update our store
                    (updatedFish: Fish) =>
                        new FishUpdateSuccessAction({
                            id: updatedFish.id,
                            changes: updatedFish
                        })
                ),
                catchError(err => of(new FishUpdateFailAction(err)))
            )
        )
    );
    @Effect()
    deleteFish$ = this.actions$.pipe(ofType<FishDeleteAction>(FishActions.DeleteFish),
        mergeMap((action: FishDeleteAction) => this.aquariumService.deleteFish(action.payload).pipe(
            map(() => new FishDeleteSuccessAction(action.payload)),
            catchError(error => of(new FishDeleteFailAction(error)))
        )));
}