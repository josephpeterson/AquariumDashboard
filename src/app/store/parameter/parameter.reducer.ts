import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Aquarium } from '../../models/Aquarium';
import * as moment from 'moment';
import { AllParameterActions, ParameterActions } from './parameter.actions';
import { PaginationSliver } from 'src/app/models/PaginationSliver';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { ATOStatus } from 'src/app/models/ATOStatus';
import { WaterChange } from 'src/app/models/WaterChange';
import { WaterDosing } from 'src/app/models/WaterDosing';

export interface ParameterState {
	aquariumId: number | null,
	pagination: PaginationSliver | null,
	paginatedParameters: AquariumSnapshot[] | null
	paginatedATOStatuses: ATOStatus[] | null
	paginatedWaterChanges: WaterChange[] | null
	paginatedWaterDosings: WaterDosing[] | null

}
export const adapter: EntityAdapter<Aquarium> = createEntityAdapter<Aquarium>();
export const defaultParameterState: ParameterState = {
	aquariumId: null,
	pagination: null,
	paginatedParameters: null,
	paginatedATOStatuses: null,
	paginatedWaterChanges: null,
	paginatedWaterDosings: null
};
export const initialState: ParameterState = adapter.getInitialState(defaultParameterState);
export function parameterReducer(state = initialState, action: AllParameterActions): ParameterState {
	switch (action.type) {
		case ParameterActions.SelectDate:
			return {
				...state,
				pagination: action.payload.pagination,
				aquariumId: action.payload.aquariumId
			}
		case ParameterActions.LoadParameterSuccess:
			return {
				...state,
				paginatedParameters: action.payload
			}
		case ParameterActions.LoadATOSuccess:
			return {
				...state,
				paginatedATOStatuses: action.payload
			}
		case ParameterActions.LoadChangeSuccess:
			return {
				...state,
				paginatedWaterChanges: action.payload
			}
		case ParameterActions.LoadDoseSuccess:
			return {
				...state,
				paginatedWaterDosings: action.payload
			}

		case ParameterActions.LoadFail:
			return {
				...state,
			}
		default:
			return state;
	}
}