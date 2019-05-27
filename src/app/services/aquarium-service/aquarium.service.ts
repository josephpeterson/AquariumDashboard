import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { LightingConfiguration } from 'src/app/models/LightingConfiguration';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { Aquarium } from 'src/app/models/Aquarium';
import { catchError, map } from 'rxjs/operators';
import { Snapshot } from 'src/app/models/Snapshot';
import { CameraConfiguration } from 'src/app/models/CameraConfiguration';

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

  public getSnapshots(aqId: number): Observable<Snapshot[]> {

    return this.http.get<Snapshot[]>(this._url + "/v1/Snapshot/" + aqId + "/All");
  }
  public deleteSnapshot(snapshot: Snapshot) {
    return this.http.post<Snapshot>(this._url + "/v1/Snapshot/Delete", snapshot.id);
  }
  public takeSnapshot(aqId: number) {
    return this.http.get<Snapshot>(this._url + "/v1/Snapshot/" + aqId + "/Take/true");
  }

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
  public getApplicationLog(): Observable<string> {
    return this.http.get(this._url + "/v1/Settings/Log", { responseType: "text" });
  }
  public getCameraConfiguration(): Observable<CameraConfiguration> {
    return this.http.get<CameraConfiguration>(this._url + "/v1/Settings/CameraConfiguration");
  }
  public applyCameraConfiguration(configuration: CameraConfiguration) {
    return this.http.post(this._url + "/v1/Settings/ApplyCameraConfiguration", configuration);
  }
}