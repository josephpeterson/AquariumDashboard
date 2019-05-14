import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumState } from './aquarium.reducer';

export const aquariumState = (state: AppState) => state.aquariums;
export const selectAquarium = createSelector(aquariumState,
    (state: AquariumState) => state.aquariums);
export const isLoading = createSelector(aquariumState,
    (state: AquariumState) => state.loading);
export const getSelectedAquarium = createSelector(aquariumState,
    (state: AquariumState) => state.selectedAquarium);
    export const getError = createSelector(aquariumState,
        (state: AquariumState) => state.error);