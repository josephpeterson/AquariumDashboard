import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { AquariumActions, AllAquariumActions } from './aquarium.actions';
import { Aquarium } from '../../models/Aquarium';
import { HttpErrorResponse } from '@angular/common/http';
import { DeviceInformation } from 'src/app/modules/SharedDeviceModule/models/DeviceInformation';
import { DeviceConnectionStatus } from '../../models/types/DeviceConnectionStatus';

export interface AquariumsState extends EntityState<Aquarium> {
	loading: boolean
	selectedAquariumId: number
	error: HttpErrorResponse

	creating: boolean
	aquariumCreated: boolean
	createError: HttpErrorResponse

	pingingAquariumDevice: DeviceConnectionStatus,
	aquariumDeviceInformation: DeviceInformation,

	updating: boolean
	updated: boolean

	deleteError: HttpErrorResponse,
	deleting: boolean
	deleted: boolean

	addFishError: HttpErrorResponse
	addingFish: boolean
	addedFish: boolean

	updateFishError: HttpErrorResponse
	updatingFish: boolean
	updatedFish: boolean

	deleteFishError: HttpErrorResponse
	deletingFish: boolean,
	deletedFish: boolean
}
export const adapter: EntityAdapter<Aquarium> = createEntityAdapter<Aquarium>();

export const defaultAquariumState: AquariumsState = {
	ids: [],
	entities: {},
	loading: true,
	selectedAquariumId: null,
	error: null,

	pingingAquariumDevice: DeviceConnectionStatus.Offline,
	aquariumDeviceInformation: null,

	creating: false,
	aquariumCreated: false,
	createError: null,

	updating: false,
	updated: false,

	deleteError: null,
	deleting: false,
	deleted: false,

	addingFish: false,
	addFishError: null,
	addedFish: false,

	updateFishError: null,
	updatingFish: false,
	updatedFish: false,

	deleteFishError: null,
	deletingFish: false,
	deletedFish: false
};

export const initialState: AquariumsState = adapter.getInitialState(defaultAquariumState);


export function aquariumReducer(state = initialState, action: AllAquariumActions): AquariumsState {
	switch (action.type) {

		case AquariumActions.Load:
		case AquariumActions.LoadById:
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
		case AquariumActions.Unselect:
			return {
				...state,
				selectedAquariumId: undefined
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


		/* Deployed Device */
		case AquariumActions.LoadDeployedDeviceByAquariumId:
			return {
				...state,
				pingingAquariumDevice: DeviceConnectionStatus.Connecting
			}

		case AquariumActions.LoadDeployedDeviceFailed:
			return {
				...state,
				pingingAquariumDevice: DeviceConnectionStatus.Offline
				//error: action.payload,
			}
		case AquariumActions.LoadDeployedDeviceSuccess: //we're connected
			return {
				...state,
				pingingAquariumDevice: DeviceConnectionStatus.Connected,
				aquariumDeviceInformation: action.payload
				//error: action.payload,
			}
		case AquariumActions.LoadDeployedDeviceRenew: //we're connected but renew is needed
			return {
				...state,
				pingingAquariumDevice: DeviceConnectionStatus.Renew,
			}
		case AquariumActions.LoadDeployedDeviceOnline: //we're connected fully
			return {
				...state,
				pingingAquariumDevice: DeviceConnectionStatus.Online,
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

		/* Fish Controller */
		case AquariumActions.AddFish:
			return {
				...state,
				addingFish: true,
				addFishError: null,
				addedFish: false
			}
		case AquariumActions.AddFishFail:
			return {
				...state,
				addingFish: false,
				addedFish: false,
				addFishError: action.payload,
			}
		case AquariumActions.AddFishSuccess:
			var aqId = action.payload.aquariumId
			var aq = state.entities[aqId];
			if (aq.fish)
				aq.fish.push(action.payload);
			var update: Update<Aquarium> = {
				id: aqId,
				changes: aq
			}
			var newState = adapter.updateOne(update, state);
			return {
				...newState,
				addedFish: true,
				addingFish: false,
				addFishError: null
			}
		case AquariumActions.UpdateFish:
			return {
				...state,
				updatingFish: true,
				updateFishError: null,
				updatedFish: false
			}
		case AquariumActions.UpdateFishFail:
			return {
				...state,
				updatingFish: false,
				updateFishError: action.payload,
				updatedFish: false,
			}
		case AquariumActions.UpdateFishSuccess:
			var aqId = action.payload.aquariumId
			var aq = state.entities[aqId];
			var fish = aq.fish.filter(f => f.id == action.payload.id)[0];
			aq.fish[aq.fish.indexOf(fish)] = action.payload;
			var update: Update<Aquarium> = {
				id: aqId,
				changes: aq
			}
			var newState = adapter.updateOne(update, state);
			return {
				...newState,
				updatingFish: true,
				updateFishError: null,
				updatedFish: false,
			}
		case AquariumActions.DeleteFish:
			return {
				...state,
				deletingFish: true,
				deleteError: null,
				deletedFish: false
			}
		case AquariumActions.DeleteFishFail:
			return {
				...state,
				deletingFish: false,
				deletedFish: false,
				deleteError: action.payload
			}
		case AquariumActions.DeleteFishSuccess:
			var aqId = action.payload.changes.aquariumId
			var aq = state.entities[aqId];
			var fish = aq.fish.filter(f => f.id == action.payload.changes.id)[0];
			aq.fish.splice(aq.fish.indexOf(fish), 1);
			var update: Update<Aquarium> = {
				id: aqId,
				changes: aq
			}
			var newState = adapter.updateOne(update, state);
			return {
				...newState,
				deletedFish: true,
				deletingFish: false,
				deleteFishError: null
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