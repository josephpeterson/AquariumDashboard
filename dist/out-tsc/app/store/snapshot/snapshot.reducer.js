import * as tslib_1 from "tslib";
var _a;
import { createEntityAdapter } from '@ngrx/entity';
import { SnapshotActions } from './snapshot.actions';
export var adapter = createEntityAdapter();
export var defaultAquariumState = {
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
export var initialState = adapter.getInitialState(defaultAquariumState);
export function snapshotReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case SnapshotActions.LoadByAquarium:
            return tslib_1.__assign({}, state, { aquariumId: action.payload, loading: true, connectionError: null });
        case SnapshotActions.LoadFailed:
            return tslib_1.__assign({}, state, { loading: false, connectionError: action.payload });
        case SnapshotActions.LoadSuccess:
            return adapter.addAll(action.payload, tslib_1.__assign({}, state, { loading: false, connectionError: null }));
        case SnapshotActions.Delete:
            return tslib_1.__assign({}, state, { deleting: true, deleted: false, deleteError: null });
        case SnapshotActions.DeleteFail:
            return tslib_1.__assign({}, state, { deleting: false, deleted: false, deleteError: action.payload });
        case SnapshotActions.DeleteSuccess:
            return adapter.removeOne(action.payload.id, tslib_1.__assign({}, state, { deleting: false, deleted: true, deleteError: null }));
        case SnapshotActions.Take:
            return tslib_1.__assign({}, state, { taking: true, taken: false, takeError: null });
        case SnapshotActions.TakeFail:
            return tslib_1.__assign({}, state, { taking: false, taken: false, takeError: action.payload });
        case SnapshotActions.TakeSuccess:
            return adapter.addOne(action.payload, tslib_1.__assign({}, state, { taking: false, taken: true, takeError: null }));
        case SnapshotActions.Reset:
            return tslib_1.__assign({}, state, { taking: false, taken: false, deleted: false, deleting: false, deleteError: null, takeError: null });
        default:
            return state;
    }
}
export var selectAll = (_a = adapter.getSelectors(), _a.selectAll), selectEntities = _a.selectEntities, selectIds = _a.selectIds, selectTotal = _a.selectTotal;
//# sourceMappingURL=snapshot.reducer.js.map