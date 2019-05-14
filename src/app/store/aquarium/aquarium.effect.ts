import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { AquariumActions, AquariumLoadAction, AquariumLoadSuccessAction, AquariumLoadFailAction, AquariumUpdateAction, AquariumUpdateSuccessAction, AquariumUpdateFailAction } from './aquarium.actions';

import { switchMap, tap, map, catchError, mergeMap } from 'rxjs/operators'
import { AquariumService } from 'src/app/services/aquarium-service/aquarium.service';
import { of, Observable } from 'rxjs'
import { Action } from 'rxjs/internal/scheduler/Action';
import { Aquarium } from 'src/app/models/Aquarium';

@Injectable()
export class AquariumEffects {
    constructor(private aquariumService: AquariumService,
        private actions$: Actions) {

    }

    @Effect()
    loadAquariums$ = this.actions$.pipe(ofType<AquariumLoadAction>(AquariumActions.Load),
        mergeMap(() => this.aquariumService.getAquariums().pipe(
            map(aquariums => new AquariumLoadSuccessAction(aquariums),
                catchError(error => of(new AquariumLoadFailAction(error)))
            )
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
}