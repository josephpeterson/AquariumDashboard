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
export const getDeployedDeviceInformation = createSelector(AquariumsState,
    (state: AquariumReducer.AquariumsState) => {
        return state.aquariumDeviceInformation
    }
);
export const getDeviceConnectionStatus = createSelector(AquariumsState,
    (state: AquariumReducer.AquariumsState) => {
        return state.pingingAquariumDevice
    }
);
export const getAquariumById = createSelector(
    AquariumsState,
    (state: AquariumReducer.AquariumsState, aqId) => state.entities[aqId]
);


export const isLoadingAquariums = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.loading);

export const getConnectionError = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.error);


/* Create aquarium */
export const getAquariumWasCreated = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.aquariumCreated);
export const getAquariumCreateError = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.createError);
export const isCreatingAquarium = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.creating);

/* Update */
export const isUpdatingAquarium = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.updating);
export const getDidUpdate = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.updated);


/* Delete */
export const isDeletingAquarium = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.deleting);
export const getDidDelete = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.deleted);
export const getDeleteError = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.deleteError);




//Fish support (maybe move this into it's own store at some point)



/* Read */
export const getAquariumFish = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.entities[state.selectedAquariumId].fish);

/* Update */
export const isUpdatingFish = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.updatingFish);
export const getFishWasUpdated = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.updatedFish);
export const getFishUpdateError = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.updateFishError);
/* Delete */
export const isDeletingFish = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.deletingFish);
export const getFishWasDeleted = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.deletedFish);
export const getFishDeleteError = createSelector(AquariumsState, (state: AquariumReducer.AquariumsState) => state.deleteFishError);
