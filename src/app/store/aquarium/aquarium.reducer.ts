import { Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AquariumActions, AllAquariumActions } from './aquarium.actions';
import { Aquarium } from '../../models/Aquarium';

export class AquariumState {
  aquariums: Aquarium[]
  loading: boolean = false
  selectedAquarium: Aquarium
  error: string
}

export const defaultAquariumState: AquariumState = {
  aquariums: [],
  loading: false,
  selectedAquarium: null,
  error: null
};
export const aquariumAdapater: EntityAdapter<Aquarium> = createEntityAdapter<Aquarium>();
export const initialState = aquariumAdapater.getInitialState(defaultAquariumState);


export function aquariumReducer(state = initialState, action: AllAquariumActions) {
  switch (action.type) {
    case AquariumActions.Load:
      return {
        ...state,
        loading: true
      }

    case AquariumActions.LoadSuccess:
      return {
        ...state,
        loading: false,
        aquariums: action.payload
      }

    case AquariumActions.LoadFail:
      return {
        ...state,
        loading: false
      }
    case AquariumActions.MakeSelection:
      return {
        ...state,
        selectedAquarium: state.aquariums.filter(aq => aq.id == action.aquariumId)[0]
      }
    case AquariumActions.UpdateSuccess:
      return aquariumAdapater.updateOne(action.aquarium, state)
    case AquariumActions.UpdateFail: 
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}