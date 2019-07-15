import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AllSnapshotActions, SnapshotActions } from './snapshot.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';

export interface SnapshotState extends EntityState<AquariumSnapshot> {
	loading: boolean
	aquariumId: number
	connectionError: HttpErrorResponse

	deleteError: HttpErrorResponse,
	deleting: boolean
	deleted: boolean

	takeError: HttpErrorResponse,
	taking: boolean
	taken: boolean
}
export const adapter: EntityAdapter<AquariumSnapshot> = createEntityAdapter<AquariumSnapshot>();

export const defaultAquariumState: SnapshotState = {
	ids: [],
	entities: {},

	loading: false,
	aquariumId: null,
	connectionError: null,

	deleteError: null,
	deleting: false,
	deleted: false,

	takeError: null,
	taking: false,
	taken: false,
};
export const initialState: SnapshotState = adapter.getInitialState(defaultAquariumState);


export function snapshotReducer(state = initialState, action: AllSnapshotActions): SnapshotState {
	switch (action.type) {

		case SnapshotActions.LoadByAquarium:
			return {
				...state,
				aquariumId: action.payload,
				loading: true,
				connectionError: null
			}
		case SnapshotActions.LoadFailed:
			return {
				...state,
				loading: false,
				connectionError: action.payload
			}
		case SnapshotActions.LoadSuccess:
			return adapter.addAll(action.payload, {
				...state,
				loading: false,
				connectionError: null
			});

		case SnapshotActions.Delete:
			return {
				...state,
				deleting: true,
				deleted: false,
				deleteError: null
			}
		case SnapshotActions.DeleteFail:
			return {
				...state,
				deleting: false,
				deleted: false,
				deleteError: action.payload
			}
		case SnapshotActions.DeleteSuccess:
			return adapter.removeOne(action.payload.id, {
				...state,
				deleting: false,
				deleted: true,
				deleteError: null
			})
		case SnapshotActions.Take:
			return {
				...state,
				taking: true,
				taken: false,
				takeError: null
			}
		case SnapshotActions.TakeFail:
			return {
				...state,
				taking: false,
				taken: false,
				takeError: action.payload
			}
		case SnapshotActions.TakeSuccess:
			return adapter.addOne(action.payload, {
				...state,
				taking: false,
				taken: true,
				takeError: null
			})
		case SnapshotActions.Reset:
			return {
				...state,
				taking: false,
				taken: false,
				deleted: false,
				deleting: false,
				deleteError: null,
				takeError: null
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