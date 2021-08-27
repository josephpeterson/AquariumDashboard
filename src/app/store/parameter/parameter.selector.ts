import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as ParameterReducer from './parameter.reducer';

export const parameterState = createFeatureSelector<ParameterReducer.ParameterState>("parameter");
export const getSelectedDate = createSelector(parameterState, (state: ParameterReducer.ParameterState) => state);
export const getPaginatedParameters = createSelector(parameterState, (state: ParameterReducer.ParameterState) => state.paginatedParameters);
export const getPaginatedATOStatuses = createSelector(parameterState, (state: ParameterReducer.ParameterState) => state.paginatedATOStatuses);
export const getPaginatedWaterChanges = createSelector(parameterState, (state: ParameterReducer.ParameterState) => state.paginatedWaterChanges);
export const getPaginatedWaterDosings = createSelector(parameterState, (state: ParameterReducer.ParameterState) => state.paginatedWaterDosings);
