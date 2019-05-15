import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumSelectionState } from './aquarium.reducer';


export const aquariumState = (state: AppState) => state.aquariums;

export const getAllAquariums = createSelector(aquariumState, (state: AquariumSelectionState) => state.aquariums);

export const hasValidAquarium = createSelector(aquariumState, (state: AquariumSelectionState) => state.aquariums.filter(aq => aq.id == state.selectedAquariumId).length > 0);
export const getSelectedAquarium = createSelector(aquariumState, (state: AquariumSelectionState) => state.aquariums.filter(aq => aq.id == state.selectedAquariumId)[0]);

export const getAquariumById = (id: number) => createSelector(aquariumState, 
    (state: AquariumSelectionState) => state.aquariums.find(a => a.id == id));

export const isLoadingAquariums = createSelector(aquariumState,(state: AquariumSelectionState) => state.loading);

export const getConnectionError = createSelector(aquariumState,(state: AquariumSelectionState) => state.error);