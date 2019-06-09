export var SpeciesActions;
(function (SpeciesActions) {
    SpeciesActions["LoadSpecies"] = "[Species] LoadByAquarium";
    SpeciesActions["LoadSpeciesSuccess"] = "[Species] LoadSpeciesSuccess";
    SpeciesActions["LoadAllSpeciesFail"] = "[Species] LoadAllSpeciesFail";
    SpeciesActions["AddSpecies"] = "[Species] AddSpecies";
    SpeciesActions["AddSpeciesSuccess"] = "[Species] AddSpeciesSuccess";
    SpeciesActions["AddSpeciesFail"] = "[Species] AddSpeciesFail";
    SpeciesActions["UpdateSpecies"] = "[Species] UpdateSpecies";
    SpeciesActions["UpdateSpeciesSuccess"] = "[Species] UpdateSpeciesSuccess";
    SpeciesActions["UpdateSpeciesFail"] = "[Species] UpdateSpeciesFail";
    SpeciesActions["DeleteSpecies"] = "[Species] DeleteSpecies";
    SpeciesActions["DeleteSpeciesSuccess"] = "[Species] DeleteSpeciesSuccess";
    SpeciesActions["DeleteSpeciesFail"] = "[Species] DeleteSpeciesFail";
    SpeciesActions["Reset"] = "[Species] Reset";
})(SpeciesActions || (SpeciesActions = {}));
/* Loading */
var SpeciesLoadAction = /** @class */ (function () {
    function SpeciesLoadAction() {
        this.type = SpeciesActions.LoadSpecies;
    }
    return SpeciesLoadAction;
}());
export { SpeciesLoadAction };
var SpeciesLoadSuccessAction = /** @class */ (function () {
    function SpeciesLoadSuccessAction(payload) {
        this.payload = payload;
        this.type = SpeciesActions.LoadSpeciesSuccess;
    }
    return SpeciesLoadSuccessAction;
}());
export { SpeciesLoadSuccessAction };
var SpeciesLoadFailAction = /** @class */ (function () {
    function SpeciesLoadFailAction(payload) {
        this.payload = payload;
        this.type = SpeciesActions.LoadAllSpeciesFail;
    }
    return SpeciesLoadFailAction;
}());
export { SpeciesLoadFailAction };
/* Creating Species */
var SpeciesAddAction = /** @class */ (function () {
    function SpeciesAddAction(payload) {
        this.payload = payload;
        this.type = SpeciesActions.AddSpecies;
    }
    return SpeciesAddAction;
}());
export { SpeciesAddAction };
var SpeciesAddSuccessAction = /** @class */ (function () {
    function SpeciesAddSuccessAction(payload) {
        this.payload = payload;
        this.type = SpeciesActions.AddSpeciesSuccess;
    }
    return SpeciesAddSuccessAction;
}());
export { SpeciesAddSuccessAction };
var SpeciesAddFailAction = /** @class */ (function () {
    function SpeciesAddFailAction(payload) {
        this.payload = payload;
        this.type = SpeciesActions.AddSpeciesFail;
    }
    return SpeciesAddFailAction;
}());
export { SpeciesAddFailAction };
/* Updating Species */
var SpeciesUpdateAction = /** @class */ (function () {
    function SpeciesUpdateAction(payload) {
        this.payload = payload;
        this.type = SpeciesActions.UpdateSpecies;
    }
    return SpeciesUpdateAction;
}());
export { SpeciesUpdateAction };
var SpeciesUpdateSuccessAction = /** @class */ (function () {
    function SpeciesUpdateSuccessAction(payload) {
        this.payload = payload;
        this.type = SpeciesActions.UpdateSpeciesSuccess;
    }
    return SpeciesUpdateSuccessAction;
}());
export { SpeciesUpdateSuccessAction };
var SpeciesUpdateFailAction = /** @class */ (function () {
    function SpeciesUpdateFailAction(payload) {
        this.payload = payload;
        this.type = SpeciesActions.UpdateSpeciesFail;
    }
    return SpeciesUpdateFailAction;
}());
export { SpeciesUpdateFailAction };
/* Deleting Species */
var SpeciesDeleteAction = /** @class */ (function () {
    function SpeciesDeleteAction(payload) {
        this.payload = payload;
        this.type = SpeciesActions.DeleteSpecies;
    }
    return SpeciesDeleteAction;
}());
export { SpeciesDeleteAction };
var SpeciesDeleteSuccessAction = /** @class */ (function () {
    function SpeciesDeleteSuccessAction(payload) {
        this.payload = payload;
        this.type = SpeciesActions.DeleteSpeciesSuccess;
    }
    return SpeciesDeleteSuccessAction;
}());
export { SpeciesDeleteSuccessAction };
var SpeciesDeleteFailAction = /** @class */ (function () {
    function SpeciesDeleteFailAction(payload) {
        this.payload = payload;
        this.type = SpeciesActions.DeleteSpeciesFail;
    }
    return SpeciesDeleteFailAction;
}());
export { SpeciesDeleteFailAction };
var SpeciesResetAction = /** @class */ (function () {
    function SpeciesResetAction() {
        this.type = SpeciesActions.Reset;
    }
    return SpeciesResetAction;
}());
export { SpeciesResetAction };
//# sourceMappingURL=species.actions.js.map