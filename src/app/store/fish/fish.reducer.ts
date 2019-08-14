import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';
import { Fish } from 'src/app/models/Fish';
import { AllFishActions, FishActions } from './fish.actions';

export interface FishState extends EntityState<Fish> {
	loading: boolean
	loaded: boolean
	loadError: HttpErrorResponse

	selectedFishId: number

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
export const adapter: EntityAdapter<Fish> = createEntityAdapter<Fish>();

export const defaultFishState: FishState = {
	ids: [],
	entities: {},
	selectedFishId: null,

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
export const initialState: FishState = adapter.getInitialState(defaultFishState);


export function fishReducer(state = initialState, action: AllFishActions): FishState {
	switch (action.type) {

		//Loading
		case FishActions.LoadFishById:
			return {
				...state,
				loading: true,
				//loaded: false,
				//loadError: null,
			}
		case FishActions.LoadFishSuccess:
			return adapter.addMany(action.payload, {
				...state,
				loading: false,
				loaded: true,
				loadError: null
			})
		case FishActions.LoadFishFail:
			return {
				...state,
				loading: false,
				//loaded: false,
				loadError: action.payload
			}
		//Creating
		case FishActions.AddFish:
			return {
				...state,
				creating: true,
				//created: false,
				//createError: null,
			}
		case FishActions.AddFishSuccess:
			return adapter.addOne(action.payload, {
				...state,
				creating: false,
				created: true,
				//createError: null,
			})
		case FishActions.AddFishFail:
			return {
				...state,
				creating: false,
				//created: false,
				createError: action.payload,
			}
		//Updating
		case FishActions.UpdateFish:
			return {
				...state,
				updating: true,
				//updated: false,
				//updateError: null,
			}
		case FishActions.UpdateFishSuccess:
			return adapter.updateOne(action.payload, {
				...state,
				updating: false,
				updated: true,
				//updateError: null,
			})
		case FishActions.UpdateFishFail:
			return {
				...state,
				updating: false,
				//updated: false,
				updateError: action.payload,
			}

		//Deleting
		case FishActions.DeleteFish:
			return {
				...state,
				deleting: true,
				//deleted: false,
				//deleteError: null,
			}
		case FishActions.DeleteFishSuccess:
			return adapter.removeOne(action.payload.id, {
				...state,
				deleting: false,
				deleted: true,
				//deleteError: null,
			})
		case FishActions.DeleteFishFail:
			return {
				...state,
				deleting: false,
				//deleted: false,
				deleteError: action.payload,
			}
		case FishActions.LoadFishFail:
			return {
				...state,
				deleting: false,
				//deleted: false,
				deleteError: action.payload,
			}

		case FishActions.SelectFish:
			return {
				...state,
				selectedFishId: action.payload
			}

		//Reset
		case FishActions.Reset:
			return {
				...defaultFishState
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