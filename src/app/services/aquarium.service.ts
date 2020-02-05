import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { LightingConfiguration } from 'src/app/models/LightingConfiguration';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { Aquarium } from 'src/app/models/Aquarium';
import { catchError, map } from 'rxjs/operators';
import { Fish } from 'src/app/models/Fish';
import { Species } from 'src/app/models/Species';
import { AquariumDevice } from 'src/app/models/AquariumDevice';
import { CameraConfiguration } from 'src/app/models/CameraConfiguration';
import { AquariumPhoto } from 'src/app/models/AquariumPhoto';
import { FishPhoto } from '../models/FishPhoto';
import { BugReport } from '../models/BugReport';
import { AquariumAccount } from '../models/AquariumAccount';
import { AccountProfile } from '../models/AquariumProfile';
import { Activity } from '../models/Activity';
import { AccountRelationship } from '../models/AccountRelationship';
import { SearchOptions } from '../models/SearchOptions';
import { SearchResult } from '../models/SearchResult';
import { PhotoContent } from '../models/PhotoContent';
import { DeviceSchedule } from '../models/DeviceSchedule';
import { DeviceScheduleTask } from '../models/DeviceScheduleTask';
import { PaginationSliver } from '../models/PaginationSliver';
import { WaterChange } from '../models/WaterChange';
import { WaterDosing } from '../models/WaterDosing';
import { PhotoTimelapseOptions } from '../models/PhotoTimelapseOptions';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: "root"
})
export class AquariumService {
  private _url: string;
  private _cdn: string;

  public aquariumId: number;

  constructor(private http: HttpClient) {
    this._url = environment.urls.aquariumApi;
    this._cdn = environment.urls.azureCDN;
  }

  public getCurrentUser() {
    return this.http.get<AquariumAccount>(this._url + "/v1/Account/Current");
  }
  public SendLightingConfiguration(config: LightingConfiguration) {
    return this.http.post<LightingConfiguration>(this._url + "/v1/lighting", config, httpOptions).toPromise()
      .then((data) => {
        alert("here?!");
      })
      .catch((data) => {
        alert("I expected to get an error!");
        console.log(data);
      });
  }


  /* Snapshot */
  public getSnapshots(aqId: number, offset: number, count: number): Observable<AquariumSnapshot[]> {

    return this.http.post<AquariumSnapshot[]>(this._url + `/v1/Aquarium/${aqId}/Snapshots`, {
      offset: offset,
      max: count
    });
  }
  public deleteSnapshot(snapshot: AquariumSnapshot) {
    return this.http.post<AquariumSnapshot>(this._url + "/v1/Snapshot/Delete", snapshot.id);
  }
  public takeSnapshot(aqId: number) {
    return this.http.get<AquariumSnapshot>(this._url + "/v1/Snapshot/" + aqId + "/Take/true");
  }
  public getLatestSnapshot(aqId: number): Observable<AquariumSnapshot> {

    return this.http.get<AquariumSnapshot>(this._url + "/v1/Snapshot/" + aqId + "/Latest");
  }
  public updateSnapshot(snapshot: AquariumSnapshot): Observable<AquariumSnapshot> {
    return this.http.post<AquariumSnapshot>(this._url + "/v1/Snapshot/Update", snapshot);
  }
  public createSnapshot(snapshot: AquariumSnapshot, uploadedPhoto: any): Observable<any> {
    const url = this._url + "/v1/Snapshot/" + snapshot.aquariumId + "/Create";
    let formData = new FormData();

    var response = {
      ...snapshot,
      snapshotImage: uploadedPhoto ? uploadedPhoto.file : null
    }
    response.date = snapshot.date.toISOString();
    for (var key in response) formData.set(key, response[key]);

    let options: any = {
      observe: "response",
      reportProgress: true,
    };

    return this.http.post<any>(url, formData, options);
  }
  public deleteAllSnapshots(aqId: number) {
    return this.http.delete(this._url + `/v1/Aquarium/${aqId}/Snapshots`);
  }
  deleteSnapshots(snapshotIds: number[]) {
    return this.http.post(this._url + `/v1/Snapshot/DeleteMultiple`,snapshotIds);
  }




  /* Aquariums */
  public getAquariums(): Observable<Aquarium[]> {
    return this.http.get<Aquarium[]>(this._url + "/v1/Aquarium/All");
  }
  public getAquariumById(aquariumId: number) {
    return this.http.get<Aquarium>(this._url + "/v1/Aquarium/" + aquariumId);
  }
  public updateAquarium(aquarium: Aquarium): Observable<Aquarium> {
    return this.http.post<Aquarium>(this._url + "/v1/Aquarium/Update", aquarium);
  }
  public createAquarium(aquarium: Aquarium): Observable<Aquarium> {
    return this.http.post<Aquarium>(this._url + "/v1/Aquarium/Add", aquarium);
  }
  public deleteAquarium(aquarium: Aquarium): Observable<Aquarium> {
    return this.http.post<Aquarium>(this._url + "/v1/Aquarium/Delete", aquarium.id);
  }


  /* Settings */
  public getApplicationLog(): Observable<string> {
    return this.http.get(this._url + "/v1/Admin/ApplicationLog", { responseType: "text" });
  }
  public deleteApplicationLog(): Observable<any> {
    return this.http.delete(this._url + "/v1/Admin/ApplicationLog");
  }
  public getCameraConfiguration(): Observable<CameraConfiguration> {
    return this.http.get<CameraConfiguration>(this._url + "/v1/Settings/CameraConfiguration");
  }
  public applyCameraConfiguration(configuration: CameraConfiguration) {
    return this.http.post(this._url + "/v1/Settings/ApplyCameraConfiguration", configuration);
  }

  /* Species Controller */
  public getAllSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>(this._url + `/v1/Species`);
  }
  public createSpecies(species: Species): Observable<Species> {
    return this.http.post<Species>(this._url + "/v1/Species/Add", species);
  }
  public updateSpecies(species: Species): Observable<Species> {
    return this.http.post<Species>(this._url + "/v1/Species/Update", species);
  }
  public deleteSpecies(species: Species): Observable<Species> {
    return this.http.post<Species>(this._url + "/v1/Species/Delete", species.id);
  }
  public scrapeSpecies(resource: string): Observable<Species> {
    var species = new Species({
      website: resource
    });
    return this.http.post<Species>(this._url + "/v1/Scraper/Scrape", species);
  }

  /* Fish Controller */
  public getFishByAquariumId(aquariumId: number): Observable<Fish[]> {
    return this.http.get<Fish[]>(this._url + `/v1/Fish/Aquarium/${aquariumId}`);
  }
  public getFishById(fishId: number): Observable<Fish> {
    return this.http.get<Fish>(this._url + `/v1/Fish/${fishId}`);
  }
  public updateFish(fish: Fish): Observable<Fish> {
    return this.http.post<Fish>(this._url + "/v1/Fish/Update", fish);
  }
  public createFish(fish: Fish): Observable<Fish> {
    return this.http.post<Fish>(this._url + "/v1/Fish/Add", fish);
  }
  public deleteFish(fish: Fish): Observable<Fish> {
    return this.http.post<Fish>(this._url + "/v1/Fish/Delete", fish.id);
  }

  /* Device Controller */
  createAquariumDevice(device: AquariumDevice): Observable<AquariumDevice> {
    return this.http.post<AquariumDevice>(this._url + `/v1/Device/Add`, device);
  }
  getAquariumDeviceById(deviceId: number): Observable<AquariumDevice> {
    return this.http.get<AquariumDevice>(this._url + `/v1/Device/${deviceId}`);
  }
  updateAquariumDevice(device: AquariumDevice): Observable<AquariumDevice> {
    return this.http.post<AquariumDevice>(this._url + `/v1/Device/Update`, device);
  }
  deleteAquariumDevice(deviceId: number): Observable<AquariumDevice> {
    return this.http.post<AquariumDevice>(this._url + `/v1/Device/${deviceId}/Delete`, deviceId);
  }
  scanDeviceHardware(deviceId: number): Observable<AquariumDevice> {
    return this.http.get<AquariumDevice>(this._url + `/v1/Device/${deviceId}/Scan`);
  }
  pingDevice(deviceId: number) {
    return this.http.get(this._url + `/v1/Device/${deviceId}/Ping`);
  }

  /* Profile Controller */
  getUserProfile(userId: number) {
    return this.http.get(this._url + `/v1/Profile/${userId}`);
  }

  /* Bug Reports */
  submitBugReport(report: BugReport): Observable<BugReport> {
    return this.http.post<BugReport>(this._url + `/v1/Bug/Submit`, report);
  }
  public uploadFishPhoto(fishId: number, uploadedPhoto: any): Observable<any> {
    const url = this._url + "/v1/Fish/" + fishId + "/UploadPhoto";
    let formData = new FormData();

    var response = {
      //...snapshot,
      photoData: uploadedPhoto ? uploadedPhoto.file : null
    }
    //response.date = snapshot.date.toISOString();
    for (var key in response) formData.set(key, response[key]);

    let options: any = {
      observe: "response",
      reportProgress: true,
    };
    return this.http.post<any>(url, formData, options);
  }


  public getAquariumProfile(profileId: number) {
    return this.http.get<AccountProfile>(this._url + `/v1/Profile/${profileId}`);
  }

  /* Activity */
  public getAccountActivity(activityId: number): Observable<Activity> {
    return this.http.get<Activity>(this._url + `/v1/Activity/${activityId}`);
  }

  public upsertFollowUser(relationship: AccountRelationship): Observable<AccountRelationship> {
    return this.http.post<AccountRelationship>(this._url + `/v1/Profile/Follow`, relationship);
  }

  /* Search */
  performSearch(options: SearchOptions): Observable<SearchResult[]> {
    return this.http.post<SearchResult[]>(this._url + `/v1/Search`, options);
  }
  public sendPasswordResetEmail(email: string): Observable<any> {
    return this.http.post(this._url + `/v1/Auth/PasswordReset/Attempt`, {
      token: email
    });
  }

  /* Photos */
  public getPhotoPermalink(photo: PhotoContent, size: any = ""): string {

    if (!photo)
      return;
    var path = photo.filepath.substring(2);
    if (size && size != "1") {
      var p = path.split("/");
      p.splice(1, 0, size);
      path = p.join("/");
      //todo outsource this?
    }
    return this._cdn + path;
  }
  public deletePhoto(photo: PhotoContent): Observable<any> {
    return this.http.delete<any>(this._url + `/v1/Photo/${photo.id}/Delete`);
  }

  /*Profile */
  public updateAccountThumbnail(photo: PhotoContent): Observable<AccountProfile> {
    return this.http.post<AccountProfile>(this._url + `/v1/Profile/UpdateThumbnail`, photo);
  }


  public getTemperatureHistogramAll() {
    return this.http.get<Aquarium[]>(this._url + `/v1/Aquarium/TemperatureHistogram/All`);

  }


  public getDeviceLog(deviceId: number) {
    return this.http.post(this._url + `/v1/Device/${deviceId}/Log`, {}, { responseType: "text" });
  }
  clearDeviceLog(deviceId: number) {
    return this.http.post(this._url + `/v1/Device/${deviceId}/Log/Clear`, {}, { responseType: "text" });
  }
  public getDeviceInformation(deviceId: number) {
    return this.http.post(this._url + `/v1/Device/${deviceId}/Information`, {});
  }

  /* Device Schedules */
  public getDeviceScheduleTaskTypes() {
    return this.http.get(this._url + `/v1/Schedule/Tasks`);
  }
  public getDeviceSchedules() {
    return this.http.get(this._url + `/v1/Schedule`);
  }
  public createDeviceSchedule(deviceSchedule: DeviceSchedule) {
    console.log(deviceSchedule);
    return this.http.post(this._url + `/v1/Schedule/Add`, deviceSchedule);
  }
  public updateDeviceSchedule(deviceSchedule: DeviceSchedule) {
    return this.http.post(this._url + `/v1/Schedule/Update`, deviceSchedule);
  }
  public deleteDeviceSchedule(deviceScheduleId: number) {
    return this.http.delete(this._url + `/v1/Schedule/${deviceScheduleId}/Delete`);
  }
  public deploySchedule(deviceId: number, scheduleId: number) {
    return this.http.post(this._url + `/v1/Device/${deviceId}/DeploySchedule/${scheduleId}`, {});
  }
  public removeSchedule(deviceId: number, scheduleId: number) {
    return this.http.post(this._url + `/v1/Device/${deviceId}/RemoveSchedule/${scheduleId}`, {});
  }
  public getDeviceScheduleStatus(deviceId: number) {
    return this.http.post(this._url + `/v1/Device/${deviceId}/Schedule/Status`, {});
  }
  performScheduleTask(deviceId: number, deviceScheduleTask: DeviceScheduleTask) {
    return this.http.post(this._url + `/v1/Device/${deviceId}/Schedule/PerformTask`, deviceScheduleTask);
  }

  public getAquariumPhotos(id: number,pagination: PaginationSliver) {
    return this.http.post<AquariumPhoto[]>(this._url + `/v1/Photo/Aquarium/${id}`,pagination);
  }
  public getAquariumSnapshotPhotos(id: number,pagination: PaginationSliver) {
    return this.http.post<AquariumSnapshot[]>(this._url + `/v1/Photo/Aquarium/${id}/Snapshot`,pagination);
  }
  public getAquariumFishPhotos(id: number,pagination: PaginationSliver) {
    return this.http.post<FishPhoto[]>(this._url + `/v1/Photo/Aquarium/${id}/Fish`,pagination);
  }
  public getNotifications() {
    return this.http.get(this._url + `/v1/Account/Notifications`);
  }
  public dismissNotifications(notifIds: number[]) {
    return this.http.post(this._url + `/v1/Account/Notifications/Dismiss`,notifIds);
  }  

  /* Water Changes */
  public getWaterChangesByAquarium(aquariumId: number) {
    return this.http.get<WaterChange[]>(this._url + `/v1/Aquarium/${aquariumId}/Water/Change`);
  }
  public addWaterChange(aquariumId: number,waterChange: WaterChange) {
    return this.http.post<WaterChange>(this._url + `/v1/Aquarium/${aquariumId}/Water/Change`,waterChange);
  }
  public updateWaterChange(aquariumId: number,waterChange: WaterChange) {
    return this.http.put<WaterChange>(this._url + `/v1/Aquarium/${aquariumId}/Water/Change`,waterChange);
  }
  public deleteWaterChanges(aquariumId: number,waterChangeIds: number[]) {
    return this.http.post(this._url + `/v1/Aquarium/${aquariumId}/Water/Change/Delete`,waterChangeIds);
  }
  /* Water Dosings */
  public getWaterDosesByAquarium(aquariumId: number) {
    return this.http.get<WaterDosing[]>(this._url + `/v1/Aquarium/${aquariumId}/Water/Dose`);
  }
  public addWaterDosing(aquariumId: number,waterDosing: WaterDosing) {
    return this.http.post<WaterDosing>(this._url + `/v1/Aquarium/${aquariumId}/Water/Dose`,waterDosing);
  }
  public updateWaterDosing(aquariumId: number,waterDosing: WaterDosing) {
    return this.http.put<WaterDosing>(this._url + `/v1/Aquarium/${aquariumId}/Water/Dose`,waterDosing);
  }
  public deleteWaterDosings(aquariumId: number,waterDosingIds: number[]) {
    return this.http.post(this._url + `/v1/Aquarium/${aquariumId}/Water/Dose/Delete`,waterDosingIds);
  }


  public createPhotoTimelapse(snapshotIds: number[],options: PhotoTimelapseOptions) {
    return this.http.post<PhotoContent>(this._url + `/v1/Photo/Timelapse`,{
      snapshotIds: snapshotIds,
      options: options
    });
  }
}