import { Aquarium } from './models/Aquarium';
import { AquariumsState } from './store/aquarium/aquarium.reducer';
import { SnapshotState } from './store/snapshot/snapshot.reducer';
import { SpeciesState } from './store/species/species.reducer';
import { FishState } from './store/fish/fish.reducer';
import { PostState } from './store/post/post.reducer';
import { AuthState } from './store/auth/auth.reducer';
import { ParameterState } from './store/parameter/parameter.reducer';

export interface AppState {
    readonly aquariums: AquariumsState
    readonly snapshots: SnapshotState
    readonly species: SpeciesState
    readonly fish: FishState
    readonly post: PostState
    readonly auth: AuthState
    readonly parameters: ParameterState
}