import { Aquarium } from './models/Aquarium';
import { AquariumSelectionState } from './store/aquarium/aquarium.reducer';

export interface AppState {
    readonly aquariums: AquariumSelectionState
}