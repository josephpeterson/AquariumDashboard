import { Injectable } from '@angular/core';
import { AquariumService } from 'src/app/services/aquarium.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProfileLoadAction, ProfileActions, ProfileLoadSuccessAction, ProfileLoadFailAction } from './profile.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { AccountProfile } from 'src/app/models/AquariumProfile';
import { of } from 'rxjs';

@Injectable()
export class ProfileEffects {
    constructor(private aquariumService: AquariumService,
        private actions$: Actions) {

    }
    @Effect()
    loadAccountProfile$ = this.actions$.pipe(ofType<ProfileLoadAction>(ProfileActions.LoadProfile),
        mergeMap((action: ProfileLoadAction) => this.aquariumService.getAquariumProfile(action.payload).pipe(
            map((profile: AccountProfile) => new ProfileLoadSuccessAction(profile)),
            catchError(error => of(new ProfileLoadFailAction(error)))
        )));

    /*
@Effect()
updateProfile$ = this.actions$.pipe(
    ofType<ProfileUpdateAction>(
        ProfileActions.UpdateProfile
    ),
    map((action: ProfileUpdateAction) => action.payload),
    mergeMap((payload: Profile) =>
        this.aquariumService.updateProfile(payload).pipe(
            map(
                //We can either return a new AquariumLoadAction, OR just update our store
                (updatedProfile: Profile) =>
                    new ProfileUpdateSuccessAction({
                        id: updatedProfile.id,
                        changes: updatedProfile
                    })
            ),
            catchError(err => of(new ProfileUpdateFailAction(err)))
        )
    )
);
*/
}