import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Update } from '@ngrx/entity';
import { AccountProfile } from 'src/app/models/AquariumProfile';

export enum ProfileActions {
    LoadProfile = '[Profile] LoadProfile',
    LoadProfileSuccess = '[Profile] LoadProfileSuccess',
    LoadAllProfileFail = '[Profile] LoadAllProfileFail',

    UpdateProfile = '[Profile] UpdateProfile',
    UpdateProfileSuccess = '[Profile] UpdateProfileSuccess',
    UpdateProfileFail = '[Profile] UpdateProfileFail',

    Select = '[Profile] Select',
    Reset = '[Profile] Reset',
}

/* Loading */
export class ProfileLoadAction implements Action {
    readonly type = ProfileActions.LoadProfile
    constructor(public payload: number) { }

}
export class ProfileLoadSuccessAction implements Action {
    readonly type = ProfileActions.LoadProfileSuccess
    constructor(public payload: AccountProfile) { }
}
export class ProfileLoadFailAction implements Action {
    readonly type = ProfileActions.LoadAllProfileFail
    constructor(public payload: HttpErrorResponse) { }
}

/* Updating Profile */
export class ProfileUpdateAction implements Action {
    readonly type = ProfileActions.UpdateProfile
    constructor(public payload: AccountProfile) { }
}
export class ProfileUpdateSuccessAction implements Action {
    readonly type = ProfileActions.UpdateProfileSuccess
    constructor(public payload: Update<AccountProfile>) { }
}
export class ProfileUpdateFailAction implements Action {
    readonly type = ProfileActions.UpdateProfileFail
    constructor(public payload: HttpErrorResponse) { }
}

export class ProfileResetAction implements Action {
    readonly type = ProfileActions.Reset
}
export class ProfileSelectAction implements Action {
    readonly type = ProfileActions.Select
    constructor(public payload: number) {
    }
}
export type AllProfileActions =
    ProfileLoadAction |
    ProfileLoadSuccessAction |
    ProfileLoadFailAction |

    ProfileUpdateAction |
    ProfileUpdateSuccessAction |
    ProfileUpdateFailAction |

    ProfileSelectAction |
    ProfileResetAction;