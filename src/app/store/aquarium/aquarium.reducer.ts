import { Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AquariumActions, AllAquariumActions } from './aquarium.actions';
import { Aquarium } from '../../models/Aquarium';
import { HttpErrorResponse } from '@angular/common/http';

export class AquariumSelectionState {
  aquariums: Aquarium[]
  loading: boolean
  selectedAquariumId: number
  error: string

  creating: boolean
  aquariumCreated: boolean
  createError: HttpErrorResponse
}
export const defaultAquariumState: AquariumSelectionState = {
  aquariums: [],
  loading: true,
  selectedAquariumId: null,
  error: null,

  creating: false,
  aquariumCreated: false,
  createError: null
};
export const aquariumAdapater: EntityAdapter<Aquarium> = createEntityAdapter<Aquarium>();
export const initialState = aquariumAdapater.getInitialState(defaultAquariumState);


export function aquariumReducer(state = initialState, action: AllAquariumActions) {
  switch (action.type) {
    case AquariumActions.Load:
      return {
        ...state,
        loading: true,
        error: null
      }

    case AquariumActions.LoadSuccess:
      return {
        ...state,
        loading: false,
        aquariums: action.payload,
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
      return aquariumAdapater.updateOne(action.aquarium, state) //Doesn't work?
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
      return {
        ...state,
        aquariums: state.aquariums.concat([action.payload]),
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