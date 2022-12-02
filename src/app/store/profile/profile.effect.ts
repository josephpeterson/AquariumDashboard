import { Injectable } from '@angular/core';
import { AquariumService } from 'src/app/services/aquarium.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileLoadAction, ProfileActions, ProfileLoadSuccessAction, ProfileLoadFailAction } from './profile.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { AccountProfile } from 'src/app/models/AquariumProfile';
import { of } from 'rxjs';

@Injectable()
export class ProfileEffects {
    constructor(private aquariumService: AquariumService,
        private actions$: Actions) {

    }
    loadAccountProfile$ = createEffect(() => this.actions$.pipe(ofType<ProfileLoadAction>(ProfileActions.LoadProfile),
        mergeMap((action: ProfileLoadAction) => this.aquariumService.getAquariumProfile(action.payload).pipe(
            map((profile: AccountProfile) => new ProfileLoadSuccessAction(profile)),
            catchError(error => of(new ProfileLoadFailAction(error)))
        ))));
}