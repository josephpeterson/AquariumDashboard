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
import { AquariumProfile } from '../models/AquariumProfile';
import { Activity } from '../models/Activity';
import { AccountRelationship } from '../models/AccountRelationship';
import { SearchOptions } from '../models/SearchOptions';
import { SearchResult } from '../models/SearchResult';

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

  public aquariumId: number;

  constructor(private http: HttpClient) {
    this._url = environment.urls.aquariumApi;
  }

  public getCurrentUser() {
    return this.http.get<AquariumAccount>(this._url + "/v1/Current");
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
  public getSnapshots(aqId: number): Observable<AquariumSnapshot[]> {

    return this.http.get<AquariumSnapshot[]>(this._url + "/v1/Snapshot/" + aqId + "/All");
  }
  public deleteSnapshot(snapshot: AquariumSnapshot) {
    return this.http.post<AquariumSnapshot>(this._url + "/v1/Snapshot/Delete", snapshot.id);
  }
  public takeSnapshot(aqId: number) {
    return this.http.get<AquariumSnapshot>(this._url + "/v1/Snapshot/" + aqId + "/Take/true");
  }
  public getPhotoPermalink(photoId: number,size:any = "1"): string {
    return this._url + "/v1/Snapshot/Photo/" + photoId + "/" + size;
  }
  public getLatestSnapshot(aqId: number): Observable<AquariumSnapshot> {

    return this.http.get<AquariumSnapshot>(this._url + "/v1/Snapshot/" + aqId + "/Latest");
  }
  public updateSnapshot(snapshot: AquariumSnapshot): Observable<AquariumSnapshot> {
    return this.http.post<AquariumSnapshot>(this._url + "/v1/Snapshot/Update", snapshot);
  }
  public createSnapshot(snapshot: AquariumSnapshot,uploadedPhoto: any): Observable<any> {
    console.log(snapshot,uploadedPhoto);
    const url = this._url + "/v1/Snapshot/" + snapshot.aquariumId + "/Create";
    let formData = new FormData();

    var response = {
      ...snapshot,
      snapshotImage: uploadedPhoto ? uploadedPhoto.file:null
    }
    console.log(response);
    response.date = snapshot.date.toISOString();
    for(var key in response) formData.set(key,response[key]);

    let options: any = {
      observe: "response",
      reportProgress: true,
    };

    console.log(url,formData);
    return this.http.post<any>(url, formData,options);
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
    return this.http.get(this._url + "/v1/Settings/Log", { responseType: "text" });
  }
  public deleteApplicationLog(): Observable<any> {
    return this.http.get(this._url + "/v1/Settings/Log/Delete");
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

  public getFishPhotoPermalink(photoId: number,size:any = "1"): string {
    return this._url + "/v1/Fish/Photo/" + photoId + "/" + size;
  }
  public uploadFishPhoto(fishId:number,uploadedPhoto: any): Observable<any> {
    const url = this._url + "/v1/Fish/" + fishId + "/UploadPhoto";
    let formData = new FormData();

    var response = {
      //...snapshot,
      photoData: uploadedPhoto ? uploadedPhoto.file:null
    }
    console.log(response);
    //response.date = snapshot.date.toISOString();
    for(var key in response) formData.set(key,response[key]);

    let options: any = {
      observe: "response",
      reportProgress: true,
    };
    return this.http.post<any>(url, formData,options);
  }
  public deleteFishPhoto(fishPhoto: FishPhoto): Observable<any> {
    return this.http.post<any>(this._url + "/v1/Fish/Photo/Delete", fishPhoto.id);
  }

  public getAquariumProfile(profileId: number) {
    return this.http.get<AquariumProfile>(this._url + `/v1/Profile/${profileId}`);
  }

  /* Activity */
  public getAccountActivity(activityId: number): Observable<Activity> {
    return this.http.get<Activity>(this._url + `/v1/Activity/${activityId}`);
  }

  public upsertFollowUser(relationship: AccountRelationship): Observable<AccountRelationship> {
    return this.http.post<AccountRelationship>(this._url + `/v1/Profile/Follow`,relationship);
  }

  /* Search */
  performSearch(options: SearchOptions): Observable<SearchResult[]>  {
    return this.http.post<SearchResult[]>(this._url + `/v1/Search`,options);
  }
}