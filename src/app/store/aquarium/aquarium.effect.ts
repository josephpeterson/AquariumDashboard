import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { AquariumActions, AquariumListAction, AquariumLoadSuccessAction, AquariumLoadFailAction, AquariumUpdateAction, AquariumUpdateSuccessAction, AquariumUpdateFailAction, AquariumCreateSuccessAction, AquariumCreateFailAction, AquariumCreateAction, AquariumDeleteAction, AquariumDeleteSuccessAction, AquariumDeleteFailAction, AquariumLoadByIdAction, AquariumSelectionAction, AquariumAddFishAction, AquariumAddFishSuccessAction, AquariumAddFishFailAction, AquariumUpdateFishAction, AquariumUpdateFishSuccessAction, AquariumUpdateFishFailAction, AquariumDeleteFishAction, AquariumDeleteFishSuccessAction, AquariumDeleteFishFailAction } from './aquarium.actions';

import { map, catchError, mergeMap } from 'rxjs/operators'
import { AquariumService } from 'src/app/services/aquarium-service/aquarium.service';
import { of } from 'rxjs'
import { Aquarium } from 'src/app/models/Aquarium';
import { Fish } from 'src/app/models/Fish';
import { Update } from '@ngrx/entity';

@Injectable()
export class AquariumEffects {
    constructor(private aquariumService: AquariumService,
        private actions$: Actions) {

    }

    @Effect()
    loadAquariums$ = this.actions$.pipe(ofType<AquariumListAction>(AquariumActions.Load),
        mergeMap(() => this.aquariumService.getAquariums().pipe(
            map(aquariums => new AquariumLoadSuccessAction(aquariums)),
            catchError(error => of(new AquariumLoadFailAction(error)))
        )));
    @Effect()
    loadAquariumDetailed$ = this.actions$.pipe(
        ofType<AquariumSelectionAction>(AquariumActions.MakeSelection), map((action) => action.aquariumId),
        mergeMap((aquariumId: number) =>
            this.aquariumService.getAquariumById(aquariumId).pipe(
                map(
                    //We can either return a new AquariumLoadAction, OR just update our store
                    (detailedAquarium: Aquarium) => {
                        return new AquariumLoadSuccessAction([detailedAquarium])
                    }
                ),
                catchError(err => of(new AquariumLoadFailAction(err)))
            )
        )
    );
    @Effect()
    updateAquarium$ = this.actions$.pipe(
        ofType<AquariumUpdateAction>(
            AquariumActions.Update
        ),
        map((action: AquariumUpdateAction) => action.aquarium),
        mergeMap((aquarium: Aquarium) =>
            this.aquariumService.updateAquarium(aquarium).pipe(
                map(
                    //We can either return a new AquariumLoadAction, OR just update our store
                    (newAquarium: Aquarium) =>
                        new AquariumUpdateSuccessAction({
                            id: newAquarium.id,
                            changes: newAquarium
                        })
                ),
                catchError(err => of(new AquariumUpdateFailAction(err)))
            )
        )
    );
    @Effect()
    createAquarium$ = this.actions$.pipe(
        ofType<AquariumCreateAction>(
            AquariumActions.Create
        ),
        map((action: AquariumCreateAction) => action.payload),
        mergeMap((payload: Aquarium) =>
            this.aquariumService.createAquarium(payload).pipe(
                map(
                    //We can either return a new AquariumLoadAction, OR just update our store
                    (newAquarium: Aquarium) =>
                        new AquariumCreateSuccessAction(newAquarium)
                ),
                catchError(err => of(new AquariumCreateFailAction(err)))
            )
        )
    );
    @Effect()
    deleteAquarium$ = this.actions$.pipe(
        ofType<AquariumDeleteAction>(
            AquariumActions.Delete
        ),
        map((action: AquariumDeleteAction) => action.payload),
        mergeMap((payload: Aquarium) =>
            this.aquariumService.deleteAquarium(payload).pipe(
                map(
                    () => new AquariumDeleteSuccessAction(payload)
                ),
                catchError(err => of(new AquariumDeleteFailAction(err)))
            )
        )
    );

    @Effect()
    addFishToAquarium$ = this.actions$.pipe(
        ofType<AquariumAddFishAction>(
            AquariumActions.AddFish
        ),
        map((action: AquariumAddFishAction) => action.payload),
        mergeMap((payload: Fish) =>
            this.aquariumService.createFish(payload).pipe(
                map(
                    //We can either return a new AquariumLoadAction, OR just update our store
                    (addedFish: Fish) => new AquariumAddFishSuccessAction(addedFish)
                ),
                catchError(err => of(new AquariumAddFishFailAction(err)))
            )
        )
    );
    @Effect()
    updateFish$ = this.actions$.pipe(
        ofType<AquariumUpdateFishAction>(
            AquariumActions.UpdateFish
        ),
        map((action: AquariumUpdateFishAction) => action.payload),
        mergeMap((payload: Fish) =>
            this.aquariumService.updateFish(payload).pipe(
                map(
                    //We can either return a new AquariumLoadAction, OR just update our store
                    (addedFish: Fish) =>
                        new AquariumUpdateFishSuccessAction(addedFish)
                ),
                catchError(err => of(new AquariumUpdateFishFailAction(err)))
            )
        )
    );
    @Effect()
    deleteFish$ = this.actions$.pipe(
        ofType<AquariumDeleteFishAction>(
            AquariumActions.DeleteFish
        ),
        map((action: AquariumDeleteFishAction) => action.payload),
        mergeMap((payload: Fish) =>
            this.aquariumService.deleteFish(payload).pipe(
                map(
                    () => new AquariumDeleteFishSuccessAction({
                        id: payload.id,
                        changes: payload
                    })
                ),
                catchError(err => of(new AquariumDeleteFishFailAction(err)))
            )
        )
    );
}