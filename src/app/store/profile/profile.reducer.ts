import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';
import { AllProfileActions, ProfileActions } from './profile.actions';
import { AccountProfile } from 'src/app/models/AquariumProfile';

export interface ProfileState extends EntityState<AccountProfile> {
	
	loading: boolean
	loaded: boolean
	loadError: HttpErrorResponse

	updating: boolean
	updated: boolean
	updateError: HttpErrorResponse

	selectedAccountId: number
}
export const adapter: EntityAdapter<AccountProfile> = createEntityAdapter<AccountProfile>();

export const defaultProfileState: ProfileState = {
	ids: [],
	entities: {},

	loading: false,
	loaded: false,
	loadError: null,

	updating: false,
	updated: false,
	updateError: null,

	selectedAccountId: null,
};
export const initialState: ProfileState = adapter.getInitialState(defaultProfileState);


export function ProfileReducer(state = initialState, action: AllProfileActions): ProfileState {
	switch (action.type) {

		//Loading
		case ProfileActions.LoadProfile:
			return {
				...state,
				loading: true,
				//loaded: false,
				//loadError: null,
			}
		case ProfileActions.LoadProfileSuccess:
			return adapter.upsertOne(action.payload, {
				...state,
				loading: false,
				loaded: true,
				loadError: null
			})
		case ProfileActions.LoadAllProfileFail:
			return {
				...state,
				loading: false,
				//loaded: false,
				loadError: action.payload
			}
		//Updating
		case ProfileActions.UpdateProfile:
			return {
				...state,
				updating: true,
				//updated: false,
				//updateError: null,
			}
		case ProfileActions.UpdateProfileSuccess:
			return adapter.updateOne(action.payload, {
				...state,
				updating: false,
				updated: true,
				//updateError: null,
			})
		case ProfileActions.UpdateProfileFail:
			return {
				...state,
				updating: false,
				//updated: false,
				updateError: action.payload,
			}
		case ProfileActions.Select:
			return {
				...state,
				selectedAccountId: action.payload
			}
		//Reset
		case ProfileActions.Reset:
			return {
				...defaultProfileState
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