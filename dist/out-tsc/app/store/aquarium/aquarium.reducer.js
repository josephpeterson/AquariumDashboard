import * as tslib_1 from "tslib";
var _a;
import { createEntityAdapter } from '@ngrx/entity';
import { AquariumActions } from './aquarium.actions';
export var adapter = createEntityAdapter();
export var defaultAquariumState = {
    ids: [],
    entities: {},
    loading: true,
    selectedAquariumId: null,
    error: null,
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
export var initialState = adapter.getInitialState(defaultAquariumState);
export function aquariumReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case AquariumActions.Load:
            return tslib_1.__assign({}, state, { loading: true, error: null });
        case AquariumActions.LoadSuccess:
            if (action.payload.length == 1)
                console.log(action.payload[0]);
            var newState = adapter.upsertMany(action.payload, state);
            return tslib_1.__assign({}, newState, { loading: false, error: null });
        case AquariumActions.LoadFail:
            return tslib_1.__assign({}, state, { error: action.payload, loading: false });
        case AquariumActions.MakeSelection:
            return tslib_1.__assign({}, state, { selectedAquariumId: action.aquariumId });
        case AquariumActions.UpdateSuccess:
            var newState = adapter.updateOne(action.aquarium, state);
            return tslib_1.__assign({}, newState, { updating: false, updated: true });
        case AquariumActions.Update:
            return tslib_1.__assign({}, state, { updating: true, updated: false });
        case AquariumActions.UpdateFail:
            return tslib_1.__assign({}, state, { updating: false, updated: false, error: action.payload });
        case AquariumActions.CreateReset:
            return tslib_1.__assign({}, state, { createError: null, creating: false, aquariumCreated: false });
        case AquariumActions.Reset:
            return tslib_1.__assign({}, state, { createError: null, deleteError: null, deleted: false, deleting: false, updated: false, updating: false, creating: false, aquariumCreated: false });
        case AquariumActions.Create:
            return tslib_1.__assign({}, state, { error: null, creating: true });
        case AquariumActions.CreateSuccess:
            var newState = adapter.addOne(action.payload, state);
            return tslib_1.__assign({}, newState, { creating: false, aquariumCreated: true });
        case AquariumActions.CreateFail:
            return tslib_1.__assign({}, state, { error: null, creating: false, aquariumCreated: false, createError: action.payload });
        case AquariumActions.Delete:
            return tslib_1.__assign({}, state, { deleting: true, deleteError: null });
        case AquariumActions.DeleteSuccess:
            var newState = adapter.removeOne(action.payload.id, state);
            return tslib_1.__assign({}, newState, { deleted: true, deleting: false });
        case AquariumActions.DeleteFail:
            return tslib_1.__assign({}, state, { deleting: false, deleted: false, deleteError: action.payload });
        /* Fish Controller */
        case AquariumActions.AddFish:
            return tslib_1.__assign({}, state, { addingFish: true, addFishError: null, addedFish: false });
        case AquariumActions.AddFishFail:
            return tslib_1.__assign({}, state, { addingFish: false, addedFish: false, addFishError: action.payload });
        case AquariumActions.AddFishSuccess:
            var aqId = action.payload.aquariumId;
            var aq = state.entities[aqId];
            aq.fish.push(action.payload);
            var update = {
                id: aqId,
                changes: aq
            };
            var newState = adapter.updateOne(update, state);
            return tslib_1.__assign({}, newState, { addedFish: true, addingFish: false, addFishError: null });
        case AquariumActions.UpdateFish:
            return tslib_1.__assign({}, state, { updatingFish: true, updateFishError: null, updatedFish: false });
        case AquariumActions.UpdateFishFail:
            return tslib_1.__assign({}, state, { updatingFish: false, updateFishError: action.payload, updatedFish: false });
        case AquariumActions.UpdateFishSuccess:
            var aqId = action.payload.aquariumId;
            var aq = state.entities[aqId];
            var fish = aq.fish.filter(function (f) { return f.id == action.payload.id; })[0];
            aq.fish[aq.fish.indexOf(fish)] = action.payload;
            var update = {
                id: aqId,
                changes: aq
            };
            var newState = adapter.updateOne(update, state);
            return tslib_1.__assign({}, newState, { updatingFish: true, updateFishError: null, updatedFish: false });
        case AquariumActions.DeleteFish:
            return tslib_1.__assign({}, state, { deletingFish: true, deleteError: null, deletedFish: false });
        case AquariumActions.DeleteFishFail:
            return tslib_1.__assign({}, state, { deletingFish: false, deletedFish: false, deleteError: action.payload });
        case AquariumActions.DeleteFishSuccess:
            var aqId = action.payload.changes.aquariumId;
            var aq = state.entities[aqId];
            var fish = aq.fish.filter(function (f) { return f.id == action.payload.changes.id; })[0];
            aq.fish.splice(aq.fish.indexOf(fish), 1);
            var update = {
                id: aqId,
                changes: aq
            };
            var newState = adapter.updateOne(update, state);
            return tslib_1.__assign({}, newState, { deletedFish: true, deletingFish: false, deleteFishError: null });
        default:
            return state;
    }
}
export var selectAll = (_a = adapter.getSelectors(), _a.selectAll), selectEntities = _a.selectEntities, selectIds = _a.selectIds, selectTotal = _a.selectTotal;
//# sourceMappingURL=aquarium.reducer.js.map