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
  updated: false
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
      var newState = adapter.addMany(action.payload, state);
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
      return adapter.updateOne(action.aquarium, state);
      return {
        ...newState,
        updating: false,
        updated: true,
      }
    case AquariumActions.UpdateFail:
      return {
        ...state,
        error: action.payload
      }


    case AquariumActions.CreateReset:
      return {
        ...state,
        createError: null,
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