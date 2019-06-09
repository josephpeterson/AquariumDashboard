import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as SpeciesReducer from './species.reducer';


export const SpeciesState = createFeatureSelector<SpeciesReducer.SpeciesState>("species");

export const getAllSpecies = createSelector(SpeciesState, SpeciesReducer.selectAll);

export const isLoadingSpecies = createSelector(SpeciesState, (state: SpeciesReducer.SpeciesState) => state.loading);
export const getSpeciesLoadError = createSelector(SpeciesState, (state: SpeciesReducer.SpeciesState) => state.loadError);

/* Create */
export const isCreatingSpecies = createSelector(SpeciesState, (state: SpeciesReducer.SpeciesState) => state.creating);
export const getSpeciesWasCreated = createSelector(SpeciesState, (state: SpeciesReducer.SpeciesState) => state.created);
export const getSpeciesCreateError = createSelector(SpeciesState, (state: SpeciesReducer.SpeciesState) => state.createError);
/* Update */
export const isUpdatingSpecies = createSelector(SpeciesState, (state: SpeciesReducer.SpeciesState) => state.updating);
export const getSpeciesWasUpdated = createSelector(SpeciesState, (state: SpeciesReducer.SpeciesState) => state.updated);
export const getSpeciesUpdateError = createSelector(SpeciesState, (state: SpeciesReducer.SpeciesState) => state.updateError);
/* Delete */
export const isDeletingSpecies = createSelector(SpeciesState, (state: SpeciesReducer.SpeciesState) => state.deleting);
export const getSpeciesWasDeleted = createSelector(SpeciesState, (state: SpeciesReducer.SpeciesState) => state.deleted);
export const getSpeciesDeleteError = createSelector(SpeciesState, (state: SpeciesReducer.SpeciesState) => state.deleteError);
