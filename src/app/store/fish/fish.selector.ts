import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as FishReducer from './fish.reducer';


export const FishState = createFeatureSelector<FishReducer.FishState>("fish");

export const getAllFish = createSelector(FishState, FishReducer.selectAll);

export const getFishById = (targetId: number) => createSelector(FishState,(state: FishReducer.FishState) => state.entities[targetId]);


export const isLoadingFish = createSelector(FishState, (state: FishReducer.FishState) => state.loading);
export const getFishLoadError = createSelector(FishState, (state: FishReducer.FishState) => state.loadError);

/* Create */
export const isCreatingFish = createSelector(FishState, (state: FishReducer.FishState) => state.creating);
export const getFishWasCreated = createSelector(FishState, (state: FishReducer.FishState) => state.created);
export const getFishCreateError = createSelector(FishState, (state: FishReducer.FishState) => state.createError);
/* Update */
export const isUpdatingFish = createSelector(FishState, (state: FishReducer.FishState) => state.updating);
export const getFishWasUpdated = createSelector(FishState, (state: FishReducer.FishState) => state.updated);
export const getFishUpdateError = createSelector(FishState, (state: FishReducer.FishState) => state.updateError);
/* Delete */
export const isDeletingFish = createSelector(FishState, (state: FishReducer.FishState) => state.deleting);
export const getFishWasDeleted = createSelector(FishState, (state: FishReducer.FishState) => state.deleted);
export const getFishDeleteError = createSelector(FishState, (state: FishReducer.FishState) => state.deleteError);

export const getSelectedFish = createSelector(FishState,
    (state: FishReducer.FishState) => {
        return state.entities[state.selectedFishId]
    }
);