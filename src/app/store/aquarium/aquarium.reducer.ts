import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AquariumActions, AllAquariumActions } from './aquarium.actions';
import { Aquarium } from '../../models/Aquarium';
import { HttpErrorResponse } from '@angular/common/http';

export interface AquariumsState extends EntityState<Aquarium> {
	loading: boolean
	selectedAquariumId: number
	error: HttpErrorResponse

	creating: boolean
	aquariumCreated: boolean
	createError: HttpErrorResponse

	updating: boolean
	updated: boolean

	deleteError: HttpErrorResponse,
	deleting: boolean
	deleted: boolean
}
export const adapter: EntityAdapter<Aquarium> = createEntityAdapter<Aquarium>();

export const defaultAquariumState: AquariumsState = {
	ids: [],
	entities: {},
	loading: true,
	selectedAquariumId: null,
	error: null,

	creating: false,
	aquariumCreated: false,
	createError: null,

	updating: false,
	updated: false,

	deleteError: null,
	deleting: false,
	deleted: false
};

export const initialState: AquariumsState = adapter.getInitialState(defaultAquariumState);


export function aquariumReducer(state = initialState, action: AllAquariumActions): AquariumsState {
	switch (action.type) {

		case AquariumActions.Load:
			return {
				...state,
				loading: true,
				error: null
			}

		case AquariumActions.LoadSuccess:
			var newState = adapter.upsertMany(action.payload, state);
			return {
				...newState,
				loading: false,
				error: null
			}

		case AquariumActions.LoadFail:
			return {
				...state,
				error: action.payload,
				loading: false,
			}
		case AquariumActions.MakeSelection:
			return {
				...state,
				selectedAquariumId: action.aquariumId
			}
		case AquariumActions.UpdateSuccess:
			var newState = adapter.updateOne(action.aquarium, state);
			return {
				...newState,
				updating: false,
				updated: true,
			}
		case AquariumActions.Update:
			return {
				...state,
				updating: true,
				updated: false,
			}
		case AquariumActions.UpdateFail:
			return {
				...state,
				updating: false,
				updated: false,
				error: action.payload
			}


		case AquariumActions.CreateReset:
			return {
				...state,
				createError: null,
				creating: false,
				aquariumCreated: false,
			}
		case AquariumActions.Reset:
			return {
				...state,
				createError: null,
				deleteError: null,
				deleted: false,
				deleting: false,
				updated: false,
				updating: false,
				creating: false,
				aquariumCreated: false,
			}
		case AquariumActions.Create:
			return {
				...state,
				error: null,
				creating: true
			}
		case AquariumActions.CreateSuccess:
			var newState = adapter.addOne(action.payload, state);
			return {
				...newState,
				creating: false,
				aquariumCreated: true
			}
		case AquariumActions.CreateFail:
			return {
				...state,
				error: null,
				creating: false,
				aquariumCreated: false,
				createError: action.payload
			}

		case AquariumActions.Delete:
			return {
				...state,
				deleting: true,
				deleteError: null
			}
		case AquariumActions.DeleteSuccess:
			var newState = adapter.removeOne(action.payload.id, state);
			return {
				...newState,
				deleted: true,
				deleting: false
			}
		case AquariumActions.DeleteFail:
			return {
				...state,
				deleting: false,
				deleted: false,
				deleteError: action.payload
			}
		default:
			return state;
	}
}
export const {
	selectAll,
	selectEntities,
	selectIds,
	selectTotal
} = adapter.getSelectors();