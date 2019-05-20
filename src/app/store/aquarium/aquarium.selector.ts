import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as AquariumReducer from './aquarium.reducer';


export const AquariumsState = createFeatureSelector<AquariumReducer.AquariumsState>("aquariums");

export const getAllAquariums = createSelector(AquariumsState, AquariumReducer.selectAll);

export const hasValidAquarium = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.entities[state.selectedAquariumId] != undefined);
export const getSelectedAquarium = createSelector(AquariumsState,
    (state: AquariumReducer.AquariumsState) => {
        return state.entities[state.selectedAquariumId]
    }
);

export const getAquariumById = (id: number) => createSelector(AquariumsState,
    (state: AquariumReducer.AquariumsState) => state.entities[id]);

export const isLoadingAquariums = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.loading);

export const getConnectionError = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.error);


/* Create aquarium */
export const getAquariumWasCreated = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.aquariumCreated);
export const getAquariumCreateError = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.createError);
export const isCreatingAquarium = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.creating);

/* Update */
export const isUpdatingAquarium = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.updating);

