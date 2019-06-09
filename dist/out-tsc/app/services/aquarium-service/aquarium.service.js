import * as tslib_1 from "tslib";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
var httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};
var AquariumService = /** @class */ (function () {
    function AquariumService(http) {
        this.http = http;
        this._url = environment.urls.aquariumApi;
    }
    AquariumService.prototype.SendLightingConfiguration = function (config) {
        return this.http.post(this._url + "/v1/lighting", config, httpOptions).toPromise()
            .then(function (data) {
            alert("here?!");
        })
            .catch(function (data) {
            alert("I expected to get an error!");
            console.log(data);
        });
    };
    AquariumService.prototype.getSnapshots = function (aqId) {
        return this.http.get(this._url + "/v1/Snapshot/" + aqId + "/All");
    };
    AquariumService.prototype.deleteSnapshot = function (snapshot) {
        return this.http.post(this._url + "/v1/Snapshot/Delete", snapshot.id);
    };
    AquariumService.prototype.takeSnapshot = function (aqId) {
        return this.http.get(this._url + "/v1/Snapshot/" + aqId + "/Take/true");
    };
    AquariumService.prototype.getAquariums = function () {
        return this.http.get(this._url + "/v1/Aquarium/All");
    };
    AquariumService.prototype.getAquariumById = function (aquariumId) {
        return this.http.get(this._url + "/v1/Aquarium/" + aquariumId);
    };
    AquariumService.prototype.updateAquarium = function (aquarium) {
        return this.http.post(this._url + "/v1/Aquarium/Update", aquarium);
    };
    AquariumService.prototype.createAquarium = function (aquarium) {
        return this.http.post(this._url + "/v1/Aquarium/Add", aquarium);
    };
    AquariumService.prototype.deleteAquarium = function (aquarium) {
        return this.http.post(this._url + "/v1/Aquarium/Delete", aquarium.id);
    };
    AquariumService.prototype.getApplicationLog = function () {
        return this.http.get(this._url + "/v1/Settings/Log", { responseType: "text" });
    };
    AquariumService.prototype.getCameraConfiguration = function () {
        return this.http.get(this._url + "/v1/Settings/CameraConfiguration");
    };
    AquariumService.prototype.applyCameraConfiguration = function (configuration) {
        return this.http.post(this._url + "/v1/Settings/ApplyCameraConfiguration", configuration);
    };
    /* Species Controller */
    AquariumService.prototype.getAllSpecies = function () {
        return this.http.get(this._url + "/v1/Species");
    };
    AquariumService.prototype.createSpecies = function (species) {
        return this.http.post(this._url + "/v1/Species/Add", species);
    };
    AquariumService.prototype.updateSpecies = function (species) {
        return this.http.post(this._url + "/v1/Species/Update", species);
    };
    AquariumService.prototype.deleteSpecies = function (species) {
        return this.http.post(this._url + "/v1/Species/Delete", species.id);
    };
    /* Fish Controller */
    AquariumService.prototype.getFishById = function (fishId) {
        return this.http.get(this._url + ("/v1/Fish/" + fishId));
    };
    AquariumService.prototype.updateFish = function (fish) {
        return this.http.post(this._url + "/v1/Fish/Update", fish);
    };
    AquariumService.prototype.createFish = function (fish) {
        return this.http.post(this._url + "/v1/Fish/Add", fish);
    };
    AquariumService.prototype.deleteFish = function (fish) {
        return this.http.post(this._url + "/v1/Fish/Delete", fish.id);
    };
    AquariumService = tslib_1.__decorate([
        Injectable({
            providedIn: "root"
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], AquariumService);
    return AquariumService;
}());
export { AquariumService };
//# sourceMappingURL=aquarium.service.js.map