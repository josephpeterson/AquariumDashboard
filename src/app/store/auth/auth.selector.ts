import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as AuthReducer from './auth.reducer';


export const authState = createFeatureSelector<AuthReducer.AuthState>("auth");


export const getAuthenticatedUser = createSelector(authState, (state: AuthReducer.AuthState) => state.authenticatedUser);
