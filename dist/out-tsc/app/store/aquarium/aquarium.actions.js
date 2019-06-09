export var AquariumActions;
(function (AquariumActions) {
    AquariumActions["Update"] = "[Aquariums] Tank updated";
    AquariumActions["UpdateSuccess"] = "[Aquariums] Tank was updated";
    AquariumActions["UpdateFail"] = "[Aquariums] Tank failed to update";
    AquariumActions["Load"] = "[Aquariums] Load";
    AquariumActions["LoadById"] = "[Aquariums] Load by id";
    AquariumActions["LoadSuccess"] = "[Aquariums] Load Success";
    AquariumActions["LoadFail"] = "[Aquariums] Load Failure";
    AquariumActions["Create"] = "[Aquariums] Create";
    AquariumActions["CreateSuccess"] = "[Aquariums] CreateSuccess";
    AquariumActions["CreateFail"] = "[Aquariums] CreateFail";
    AquariumActions["CreateReset"] = "[Aquariums] CreateReset";
    AquariumActions["Delete"] = "[Aquariums] Delete";
    AquariumActions["DeleteSuccess"] = "[Aquariums] DeleteSuccess";
    AquariumActions["DeleteFail"] = "[Aquariums] DeleteFail";
    AquariumActions["MakeSelection"] = "[Aquariums] Tank Selected";
    AquariumActions["AddFish"] = "[Aquariums] AddFish";
    AquariumActions["AddFishFail"] = "[Aquariums] AddFishFail";
    AquariumActions["AddFishSuccess"] = "[Aquariums] AddFishSuccess";
    AquariumActions["UpdateFish"] = "[Aquariums] UpdateFish";
    AquariumActions["UpdateFishFail"] = "[Aquariums] UpdateFishFail";
    AquariumActions["UpdateFishSuccess"] = "[Aquariums] UpdateFishSuccess";
    AquariumActions["DeleteFish"] = "[Aquariums] DeleteFish";
    AquariumActions["DeleteFishFail"] = "[Aquariums] DeleteFishFail";
    AquariumActions["DeleteFishSuccess"] = "[Aquariums] DeleteFishSuccess";
    AquariumActions["Decrement"] = "[Counter Component] Decrement";
    AquariumActions["Reset"] = "[Counter Component] Reset";
})(AquariumActions || (AquariumActions = {}));
var AquariumListAction = /** @class */ (function () {
    function AquariumListAction() {
        this.type = AquariumActions.Load;
    }
    return AquariumListAction;
}());
export { AquariumListAction };
var AquariumLoadByIdAction = /** @class */ (function () {
    function AquariumLoadByIdAction(payload) {
        this.payload = payload;
        this.type = AquariumActions.LoadById;
    }
    return AquariumLoadByIdAction;
}());
export { AquariumLoadByIdAction };
var AquariumLoadSuccessAction = /** @class */ (function () {
    function AquariumLoadSuccessAction(payload) {
        this.payload = payload;
        this.type = AquariumActions.LoadSuccess;
    }
    return AquariumLoadSuccessAction;
}());
export { AquariumLoadSuccessAction };
var AquariumLoadFailAction = /** @class */ (function () {
    function AquariumLoadFailAction(payload) {
        this.payload = payload;
        this.type = AquariumActions.LoadFail;
    }
    return AquariumLoadFailAction;
}());
export { AquariumLoadFailAction };
var AquariumSelectionAction = /** @class */ (function () {
    function AquariumSelectionAction(aquariumId) {
        this.aquariumId = aquariumId;
        this.type = AquariumActions.MakeSelection;
    }
    return AquariumSelectionAction;
}());
export { AquariumSelectionAction };
var AquariumUpdateAction = /** @class */ (function () {
    function AquariumUpdateAction(aquarium) {
        this.aquarium = aquarium;
        this.type = AquariumActions.Update;
    }
    return AquariumUpdateAction;
}());
export { AquariumUpdateAction };
var AquariumUpdateSuccessAction = /** @class */ (function () {
    function AquariumUpdateSuccessAction(aquarium) {
        this.aquarium = aquarium;
        this.type = AquariumActions.UpdateSuccess;
    }
    return AquariumUpdateSuccessAction;
}());
export { AquariumUpdateSuccessAction };
var AquariumUpdateFailAction = /** @class */ (function () {
    function AquariumUpdateFailAction(payload) {
        this.payload = payload;
        this.type = AquariumActions.UpdateFail;
    }
    return AquariumUpdateFailAction;
}());
export { AquariumUpdateFailAction };
var AquariumAddFishAction = /** @class */ (function () {
    function AquariumAddFishAction(payload) {
        this.payload = payload;
        this.type = AquariumActions.AddFish;
    }
    return AquariumAddFishAction;
}());
export { AquariumAddFishAction };
var AquariumAddFishSuccessAction = /** @class */ (function () {
    function AquariumAddFishSuccessAction(payload) {
        this.payload = payload;
        this.type = AquariumActions.AddFishSuccess;
    }
    return AquariumAddFishSuccessAction;
}());
export { AquariumAddFishSuccessAction };
var AquariumAddFishFailAction = /** @class */ (function () {
    function AquariumAddFishFailAction(payload) {
        this.payload = payload;
        this.type = AquariumActions.AddFishFail;
    }
    return AquariumAddFishFailAction;
}());
export { AquariumAddFishFailAction };
var AquariumUpdateFishAction = /** @class */ (function () {
    function AquariumUpdateFishAction(payload) {
        this.payload = payload;
        this.type = AquariumActions.UpdateFish;
    }
    return AquariumUpdateFishAction;
}());
export { AquariumUpdateFishAction };
var AquariumUpdateFishSuccessAction = /** @class */ (function () {
    function AquariumUpdateFishSuccessAction(payload) {
        this.payload = payload;
        this.type = AquariumActions.UpdateFishSuccess;
    }
    return AquariumUpdateFishSuccessAction;
}());
export { AquariumUpdateFishSuccessAction };
var AquariumUpdateFishFailAction = /** @class */ (function () {
    function AquariumUpdateFishFailAction(payload) {
        this.payload = payload;
        this.type = AquariumActions.UpdateFishFail;
    }
    return AquariumUpdateFishFailAction;
}());
export { AquariumUpdateFishFailAction };
var AquariumDeleteFishAction = /** @class */ (function () {
    function AquariumDeleteFishAction(payload) {
        this.payload = payload;
        this.type = AquariumActions.DeleteFish;
    }
    return AquariumDeleteFishAction;
}());
export { AquariumDeleteFishAction };
var AquariumDeleteFishSuccessAction = /** @class */ (function () {
    function AquariumDeleteFishSuccessAction(payload) {
        this.payload = payload;
        this.type = AquariumActions.DeleteFishSuccess;
    }
    return AquariumDeleteFishSuccessAction;
}());
export { AquariumDeleteFishSuccessAction };
var AquariumDeleteFishFailAction = /** @class */ (function () {
    function AquariumDeleteFishFailAction(payload) {
        this.payload = payload;
        this.type = AquariumActions.DeleteFishFail;
    }
    return AquariumDeleteFishFailAction;
}());
export { AquariumDeleteFishFailAction };
/* Create Aquarium Dialog */
var AquariumCreateAction = /** @class */ (function () {
    function AquariumCreateAction(payload) {
        this.payload = payload;
        this.type = AquariumActions.Create;
    }
    return AquariumCreateAction;
}());
export { AquariumCreateAction };
var AquariumCreateSuccessAction = /** @class */ (function () {
    function AquariumCreateSuccessAction(payload) {
        this.payload = payload;
        this.type = AquariumActions.CreateSuccess;
    }
    return AquariumCreateSuccessAction;
}());
export { AquariumCreateSuccessAction };
var AquariumCreateFailAction = /** @class */ (function () {
    function AquariumCreateFailAction(payload) {
        this.payload = payload;
        this.type = AquariumActions.CreateFail;
    }
    return AquariumCreateFailAction;
}());
export { AquariumCreateFailAction };
var AquariumCreateResetAction = /** @class */ (function () {
    function AquariumCreateResetAction() {
        this.type = AquariumActions.CreateReset;
    }
    return AquariumCreateResetAction;
}());
export { AquariumCreateResetAction };
/* Delete Aquarium */
var AquariumDeleteAction = /** @class */ (function () {
    function AquariumDeleteAction(payload) {
        this.payload = payload;
        this.type = AquariumActions.Delete;
    }
    return AquariumDeleteAction;
}());
export { AquariumDeleteAction };
var AquariumDeleteSuccessAction = /** @class */ (function () {
    function AquariumDeleteSuccessAction(payload) {
        this.payload = payload;
        this.type = AquariumActions.DeleteSuccess;
    }
    return AquariumDeleteSuccessAction;
}());
export { AquariumDeleteSuccessAction };
var AquariumDeleteFailAction = /** @class */ (function () {
    function AquariumDeleteFailAction(payload) {
        this.payload = payload;
        this.type = AquariumActions.DeleteFail;
    }
    return AquariumDeleteFailAction;
}());
export { AquariumDeleteFailAction };
var AquariumResetAction = /** @class */ (function () {
    function AquariumResetAction() {
        this.type = AquariumActions.Reset;
    }
    return AquariumResetAction;
}());
export { AquariumResetAction };
//# sourceMappingURL=aquarium.actions.js.map