import { Injectable } from '@angular/core'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { map, catchError, mergeMap } from 'rxjs/operators'
import { AquariumService } from 'src/app/services/aquarium.service';
import { of } from 'rxjs'
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { SpeciesLoadAction, SpeciesActions, SpeciesLoadSuccessAction, SpeciesLoadFailAction, SpeciesAddAction, SpeciesAddSuccessAction, SpeciesAddFailAction, SpeciesUpdateAction, SpeciesUpdateSuccessAction, SpeciesUpdateFailAction, SpeciesDeleteAction, SpeciesDeleteSuccessAction, SpeciesDeleteFailAction } from './species.actions';
import { Species } from 'src/app/models/Species';
import { Update } from '@ngrx/entity';

@Injectable()
export class SpeciesEffects {
    constructor(private aquariumService: AquariumService,
        private actions$: Actions) {

    }

    loadAllSpecies$ = createEffect(() => this.actions$.pipe(ofType<SpeciesLoadAction>(SpeciesActions.LoadSpecies),
        mergeMap((action: SpeciesLoadAction) => this.aquariumService.getAllSpecies().pipe(
            map((species: Species[]) => new SpeciesLoadSuccessAction(species)),
            catchError(error => of(new SpeciesLoadFailAction(error)))
        ))));
    createSpecies$ = createEffect(() => this.actions$.pipe(
        ofType<SpeciesAddAction>(
            SpeciesActions.AddSpecies
        ),
        map((action: SpeciesAddAction) => action.payload),
        mergeMap((payload: Species) =>
            this.aquariumService.createSpecies(payload).pipe(
                map(
                    //We can either return a new AquariumLoadAction, OR just update our store
                    (addedSpecies: Species) =>
                        new SpeciesAddSuccessAction(addedSpecies)
                ),
                catchError(err => of(new SpeciesAddFailAction(err)))
            )
        )
    ));
    updateSpecies$ = createEffect(() => this.actions$.pipe(
        ofType<SpeciesUpdateAction>(
            SpeciesActions.UpdateSpecies
        ),
        map((action: SpeciesUpdateAction) => action.payload),
        mergeMap((payload: Species) =>
            this.aquariumService.updateSpecies(payload).pipe(
                map(
                    //We can either return a new AquariumLoadAction, OR just update our store
                    (updatedSpecies: Species) =>
                        new SpeciesUpdateSuccessAction({
                            id: updatedSpecies.id,
                            changes: updatedSpecies
                        })
                ),
                catchError(err => of(new SpeciesUpdateFailAction(err)))
            )
        )
    ));
    deleteSpecies$ = createEffect(() => this.actions$.pipe(ofType<SpeciesDeleteAction>(SpeciesActions.DeleteSpecies),
        mergeMap((action: SpeciesDeleteAction) => this.aquariumService.deleteSpecies(action.payload).pipe(
            map(() => new SpeciesDeleteSuccessAction(action.payload)),
            catchError(error => of(new SpeciesDeleteFailAction(error)))
        ))));
}