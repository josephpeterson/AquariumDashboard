import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as SpeciesReducer from './species.reducer';
export var SpeciesState = createFeatureSelector("species");
export var getAllSpecies = createSelector(SpeciesState, SpeciesReducer.selectAll);
export var isLoadingSpecies = createSelector(SpeciesState, function (state) { return state.loading; });
export var getSpeciesLoadError = createSelector(SpeciesState, function (state) { return state.loadError; });
/* Create */
export var isCreatingSpecies = createSelector(SpeciesState, function (state) { return state.creating; });
export var getSpeciesWasCreated = createSelector(SpeciesState, function (state) { return state.created; });
export var getSpeciesCreateError = createSelector(SpeciesState, function (state) { return state.createError; });
/* Update */
export var isUpdatingSpecies = createSelector(SpeciesState, function (state) { return state.updating; });
export var getSpeciesWasUpdated = createSelector(SpeciesState, function (state) { return state.updated; });
export var getSpeciesUpdateError = createSelector(SpeciesState, function (state) { return state.updateError; });
/* Delete */
export var isDeletingSpecies = createSelector(SpeciesState, function (state) { return state.deleting; });
export var getSpeciesWasDeleted = createSelector(SpeciesState, function (state) { return state.deleted; });
export var getSpeciesDeleteError = createSelector(SpeciesState, function (state) { return state.deleteError; });
//# sourceMappingURL=species.selector.js.map