export var SnapshotActions;
(function (SnapshotActions) {
    SnapshotActions["LoadByAquarium"] = "[Snapshot] LoadByAquarium";
    SnapshotActions["LoadSuccess"] = "[Snapshot] LoadSuccess";
    SnapshotActions["LoadFailed"] = "[Snapshot] LoadFailed";
    SnapshotActions["Delete"] = "[Snapshot] Delete";
    SnapshotActions["DeleteSuccess"] = "[Snapshot] DeleteSuccess";
    SnapshotActions["DeleteFail"] = "[Snapshot] DeleteFail";
    SnapshotActions["Take"] = "[Snapshot] Take";
    SnapshotActions["TakeSuccess"] = "[Snapshot] TakeSuccess";
    SnapshotActions["TakeFail"] = "[Snapshot] TakeFail";
    SnapshotActions["Reset"] = "[Snapshot] Reset";
})(SnapshotActions || (SnapshotActions = {}));
var SnapshotLoadByAquariumAction = /** @class */ (function () {
    function SnapshotLoadByAquariumAction(payload) {
        this.payload = payload;
        this.type = SnapshotActions.LoadByAquarium;
    }
    return SnapshotLoadByAquariumAction;
}());
export { SnapshotLoadByAquariumAction };
var SnapshotLoadSuccessAction = /** @class */ (function () {
    function SnapshotLoadSuccessAction(payload) {
        this.payload = payload;
        this.type = SnapshotActions.LoadSuccess;
    }
    return SnapshotLoadSuccessAction;
}());
export { SnapshotLoadSuccessAction };
var SnapshotLoadFailedAction = /** @class */ (function () {
    function SnapshotLoadFailedAction(payload) {
        this.payload = payload;
        this.type = SnapshotActions.LoadFailed;
    }
    return SnapshotLoadFailedAction;
}());
export { SnapshotLoadFailedAction };
var SnapshotDeleteAction = /** @class */ (function () {
    function SnapshotDeleteAction(payload) {
        this.payload = payload;
        this.type = SnapshotActions.Delete;
    }
    return SnapshotDeleteAction;
}());
export { SnapshotDeleteAction };
var SnapshotDeleteSuccessAction = /** @class */ (function () {
    function SnapshotDeleteSuccessAction(payload) {
        this.payload = payload;
        this.type = SnapshotActions.DeleteSuccess;
    }
    return SnapshotDeleteSuccessAction;
}());
export { SnapshotDeleteSuccessAction };
var SnapshotDeleteFailedAction = /** @class */ (function () {
    function SnapshotDeleteFailedAction(payload) {
        this.payload = payload;
        this.type = SnapshotActions.DeleteFail;
    }
    return SnapshotDeleteFailedAction;
}());
export { SnapshotDeleteFailedAction };
var SnapshotResetAction = /** @class */ (function () {
    function SnapshotResetAction() {
        this.type = SnapshotActions.Reset;
    }
    return SnapshotResetAction;
}());
export { SnapshotResetAction };
var SnapshotTakeAction = /** @class */ (function () {
    function SnapshotTakeAction(payload) {
        this.payload = payload;
        this.type = SnapshotActions.Take;
    }
    return SnapshotTakeAction;
}());
export { SnapshotTakeAction };
var SnapshotTakeSuccessAction = /** @class */ (function () {
    function SnapshotTakeSuccessAction(payload) {
        this.payload = payload;
        this.type = SnapshotActions.TakeSuccess;
    }
    return SnapshotTakeSuccessAction;
}());
export { SnapshotTakeSuccessAction };
var SnapshotTakeFailedAction = /** @class */ (function () {
    function SnapshotTakeFailedAction(payload) {
        this.payload = payload;
        this.type = SnapshotActions.TakeFail;
    }
    return SnapshotTakeFailedAction;
}());
export { SnapshotTakeFailedAction };
//# sourceMappingURL=snapshot.actions.js.map