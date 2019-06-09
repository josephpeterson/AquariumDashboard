var ConnectionError = /** @class */ (function () {
    function ConnectionError(exception) {
        this.exception = exception;
        this.description = "Unable to resolve the AquariumApi service. Please check your internet connection and try again. You are unable to use this application offline and will not be able to retrieve information about your aquariums.";
        this.title = "Connection Error";
    }
    return ConnectionError;
}());
export { ConnectionError };
//# sourceMappingURL=ConnectionError.js.map