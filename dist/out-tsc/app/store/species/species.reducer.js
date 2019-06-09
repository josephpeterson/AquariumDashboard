import * as tslib_1 from "tslib";
var _a;
import { createEntityAdapter } from '@ngrx/entity';
import { SpeciesActions } from './species.actions';
export var adapter = createEntityAdapter();
export var defaultSpeciesState = {
    ids: [],
    entities: {},
    loading: false,
    loaded: false,
    loadError: null,
    creating: false,
    created: false,
    createError: null,
    updating: false,
    updated: false,
    updateError: null,
    deleting: false,
    deleted: false,
    deleteError: null,
};
export var initialState = adapter.getInitialState(defaultSpeciesState);
export function speciesReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        //Loading
        case SpeciesActions.LoadSpecies:
            return tslib_1.__assign({}, state, { loading: true });
        case SpeciesActions.LoadSpeciesSuccess:
            return adapter.addMany(action.payload, tslib_1.__assign({}, state, { loading: false, loaded: true, loadError: null }));
        case SpeciesActions.LoadAllSpeciesFail:
            return tslib_1.__assign({}, state, { loading: false, 
                //loaded: false,
                loadError: action.payload });
        //Creating
        case SpeciesActions.AddSpecies:
            return tslib_1.__assign({}, state, { creating: true });
        case SpeciesActions.AddSpeciesSuccess:
            return adapter.addOne(action.payload, tslib_1.__assign({}, state, { creating: false, created: true }));
        case SpeciesActions.AddSpeciesFail:
            return tslib_1.__assign({}, state, { creating: false, 
                //created: false,
                createError: action.payload });
        //Updating
        case SpeciesActions.UpdateSpecies:
            return tslib_1.__assign({}, state, { updating: true });
        case SpeciesActions.UpdateSpeciesSuccess:
            return adapter.updateOne(action.payload, tslib_1.__assign({}, state, { updating: false, updated: true }));
        case SpeciesActions.UpdateSpeciesFail:
            return tslib_1.__assign({}, state, { updating: false, 
                //updated: false,
                updateError: action.payload });
        //Deleting
        case SpeciesActions.DeleteSpecies:
            return tslib_1.__assign({}, state, { deleting: true });
        case SpeciesActions.DeleteSpeciesSuccess:
            return adapter.removeOne(action.payload.id, tslib_1.__assign({}, state, { deleting: false, deleted: true }));
        case SpeciesActions.LoadAllSpeciesFail:
            return tslib_1.__assign({}, state, { deleting: false, 
                //deleted: false,
                deleteError: action.payload });
        //Reset
        case SpeciesActions.Reset:
            return tslib_1.__assign({}, defaultSpeciesState);
        default:
            return state;
    }
}
export var selectAll = (_a = adapter.getSelectors(), _a.selectAll), selectEntities = _a.selectEntities, selectIds = _a.selectIds, selectTotal = _a.selectTotal;
//# sourceMappingURL=species.reducer.js.map