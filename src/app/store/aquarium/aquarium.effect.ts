import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { AquariumActions, AquariumListAction, AquariumLoadSuccessAction, AquariumLoadFailAction, AquariumUpdateAction, AquariumUpdateSuccessAction, AquariumUpdateFailAction, AquariumCreateSuccessAction, AquariumCreateFailAction, AquariumCreateAction, AquariumDeleteAction, AquariumDeleteSuccessAction, AquariumDeleteFailAction } from './aquarium.actions';

import { map, catchError, mergeMap } from 'rxjs/operators'
import { AquariumService } from 'src/app/services/aquarium-service/aquarium.service';
import { of } from 'rxjs'
import { Aquarium } from 'src/app/models/Aquarium';

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
}