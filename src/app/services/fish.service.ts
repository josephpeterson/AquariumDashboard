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
import { AquariumAccount } from '../modules/SharedDeviceModule/models/AquariumAccount';
import { AccountProfile } from '../models/AquariumProfile';
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
export class FishService {
  private _url: string;
  constructor(private http: HttpClient) {
    this._url = environment.urls.aquariumApi;
  }
  public getFishByAquariumId(aquariumId: number): Observable<Fish[]> {
    return this.http.get<Fish[]>(this._url + `/v1/Fish/Aquarium/${aquariumId}`);
  }
  public getFishById(fishId: number): Observable<Fish> {
    return this.http.get<Fish>(this._url + `/v1/Fish/${fishId}`);
  }
  public getAllFish(): Observable<Fish[]> {
    return this.http.get<Fish[]>(this._url + `/v1/Fish`);
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
  public uploadPhoto(fishId: number, uploadedPhoto: any): Observable<any> {
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
}