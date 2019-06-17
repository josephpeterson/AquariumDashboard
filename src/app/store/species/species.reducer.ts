import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';
import { Species } from 'src/app/models/Species';
import { AllSpeciesActions, SpeciesActions } from './species.actions';

export interface SpeciesState extends EntityState<Species> {
	loading: boolean
	loaded: boolean
	loadError: HttpErrorResponse

	creating: boolean
	created: boolean
	createError: HttpErrorResponse

	updating: boolean
	updated: boolean
	updateError: HttpErrorResponse

	deleting: boolean
	deleted: boolean
	deleteError: HttpErrorResponse
}
export const adapter: EntityAdapter<Species> = createEntityAdapter<Species>();

export const defaultSpeciesState: SpeciesState = {
	ids: [],
	entities: {},

	loading: false,
	loaded: false,
	loadError: null,

	creating: false,
	created: false,
	createError: null,

	updating: false,
	updated: false,
	updateError: null,

	deleting: false,
	deleted: false,
	deleteError: null,
};
export const initialState: SpeciesState = adapter.getInitialState(defaultSpeciesState);


export function speciesReducer(state = initialState, action: AllSpeciesActions): SpeciesState {
	switch (action.type) {

		//Loading
		case SpeciesActions.LoadSpecies:
			return {
				...state,
				loading: true,
				//loaded: false,
				//loadError: null,
			}
		case SpeciesActions.LoadSpeciesSuccess:
			return adapter.addMany(action.payload, {
				...state,
				loading: false,
				loaded: true,
				loadError: null
			})
		case SpeciesActions.LoadAllSpeciesFail:
			return {
				...state,
				loading: false,
				//loaded: false,
				loadError: action.payload
			}
		//Creating
		case SpeciesActions.AddSpecies:
			return {
				...state,
				creating: true,
				//created: false,
				//createError: null,
			}
		case SpeciesActions.AddSpeciesSuccess:
			return adapter.addOne(action.payload, {
				...state,
				creating: false,
				created: true,
				//createError: null,
			})
		case SpeciesActions.AddSpeciesFail:
			return {
				...state,
				creating: false,
				//created: false,
				createError: action.payload,
			}
		//Updating
		case SpeciesActions.UpdateSpecies:
			return {
				...state,
				updating: true,
				//updated: false,
				//updateError: null,
			}
		case SpeciesActions.UpdateSpeciesSuccess:
			return adapter.updateOne(action.payload, {
				...state,
				updating: false,
				updated: true,
				//updateError: null,
			})
		case SpeciesActions.UpdateSpeciesFail:
			return {
				...state,
				updating: false,
				//updated: false,
				updateError: action.payload,
			}

		//Deleting
		case SpeciesActions.DeleteSpecies:
			return {
				...state,
				deleting: true,
				//deleted: false,
				//deleteError: null,
			}
		case SpeciesActions.DeleteSpeciesSuccess:
			return adapter.removeOne(action.payload.id, {
				...state,
				deleting: false,
				deleted: true,
				//deleteError: null,
			})
		case SpeciesActions.DeleteSpeciesFail:
			return {
				...state,
				deleting: false,
				//deleted: false,
				deleteError: action.payload,
			}
		case SpeciesActions.LoadAllSpeciesFail:
			return {
				...state,
				deleting: false,
				//deleted: false,
				deleteError: action.payload,
			}

		//Reset
		case SpeciesActions.Reset:
			return {
				...defaultSpeciesState
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