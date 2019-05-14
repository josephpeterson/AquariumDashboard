import { Aquarium } from './models/Aquarium';
import { AquariumState } from './store/aquarium/aquarium.reducer';

export interface AppState {
    readonly aquariums: AquariumState
}