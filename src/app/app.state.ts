import { Aquarium } from './models/Aquarium';
import { AquariumsState } from './store/aquarium/aquarium.reducer';
import { SnapshotState } from './store/snapshot/snapshot.reducer';

export interface AppState {
    readonly aquariums: AquariumsState
    readonly snapshots: SnapshotState
}