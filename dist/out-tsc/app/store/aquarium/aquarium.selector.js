import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as AquariumReducer from './aquarium.reducer';
export var AquariumsState = createFeatureSelector("aquariums");
export var getAllAquariums = createSelector(AquariumsState, AquariumReducer.selectAll);
export var hasValidAquarium = createSelector(AquariumsState, function (state) { return state.entities[state.selectedAquariumId] != undefined; });
export var getSelectedAquarium = createSelector(AquariumsState, function (state) {
    return state.entities[state.selectedAquariumId];
});
export var getAquariumById = function (id) { return createSelector(AquariumsState, function (state) { return state.entities[id]; }); };
export var isLoadingAquariums = createSelector(AquariumsState, function (state) { return state.loading; });
export var getConnectionError = createSelector(AquariumsState, function (state) { return state.error; });
/* Create aquarium */
export var getAquariumWasCreated = createSelector(AquariumsState, function (state) { return state.aquariumCreated; });
export var getAquariumCreateError = createSelector(AquariumsState, function (state) { return state.createError; });
export var isCreatingAquarium = createSelector(AquariumsState, function (state) { return state.creating; });
/* Update */
export var isUpdatingAquarium = createSelector(AquariumsState, function (state) { return state.updating; });
export var getDidUpdate = createSelector(AquariumsState, function (state) { return state.updated; });
/* Delete */
export var isDeletingAquarium = createSelector(AquariumsState, function (state) { return state.deleting; });
export var getDidDelete = createSelector(AquariumsState, function (state) { return state.deleted; });
export var getDeleteError = createSelector(AquariumsState, function (state) { return state.deleteError; });
//Fish support (maybe move this into it's own store at some point)
/* Create */
export var isCreatingFish = createSelector(AquariumsState, function (state) { return state.addingFish; });
export var getFishWasCreated = createSelector(AquariumsState, function (state) { return state.addedFish; });
export var getFishCreateError = createSelector(AquariumsState, function (state) { return state.addFishError; });
/* Read */
export var getAquariumFish = createSelector(AquariumsState, function (state) { return state.entities[state.selectedAquariumId].fish; });
/* Update */
export var isUpdatingFish = createSelector(AquariumsState, function (state) { return state.updatingFish; });
export var getFishWasUpdated = createSelector(AquariumsState, function (state) { return state.updatedFish; });
export var getFishUpdateError = createSelector(AquariumsState, function (state) { return state.updateFishError; });
/* Delete */
export var isDeletingFish = createSelector(AquariumsState, function (state) { return state.deletingFish; });
export var getFishWasDeleted = createSelector(AquariumsState, function (state) { return state.deletedFish; });
export var getFishDeleteError = createSelector(AquariumsState, function (state) { return state.deleteFishError; });
//# sourceMappingURL=aquarium.selector.js.map