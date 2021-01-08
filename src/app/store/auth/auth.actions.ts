import { Action } from '@ngrx/store';
import { AquariumAccount } from 'src/app/models/AquariumAccount';

export enum AuthActionTypes {
  SetAuthenticatedUser = '[Auth] Authenticated user applied',
 
}

export class AuthSetAuthenticatedUserAction implements Action {
  readonly type = AuthActionTypes.SetAuthenticatedUser
  constructor(public payload: AquariumAccount) {
  }
}
export type AuthActions =
AuthSetAuthenticatedUserAction;