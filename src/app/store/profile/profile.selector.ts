import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as ProfileReducer from './profile.reducer';


export const profileState = createFeatureSelector<ProfileReducer.ProfileState>("profile");

export const getProfileById = (targetId: number) => createSelector(profileState,(state: ProfileReducer.ProfileState) => state.entities[targetId]);

export const isLoadingProfile = createSelector(profileState, (state: ProfileReducer.ProfileState) => state.loading);
export const getProfileLoadError = createSelector(profileState, (state: ProfileReducer.ProfileState) => state.loadError);

/* Update */
export const isUpdatingProfile = createSelector(profileState, (state: ProfileReducer.ProfileState) => state.updating);
export const getProfileWasUpdated = createSelector(profileState, (state: ProfileReducer.ProfileState) => state.updated);
export const getProfileUpdateError = createSelector(profileState, (state: ProfileReducer.ProfileState) => state.updateError);


export const getSelectedProfile = createSelector(profileState,
    (state: ProfileReducer.ProfileState) => {
        return state.entities[state.selectedAccountId]
    }
);