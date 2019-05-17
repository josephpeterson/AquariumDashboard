import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { LightingConfiguration } from 'src/app/models/LightingConfiguration';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { Aquarium } from 'src/app/models/Aquarium';
import { catchError } from 'rxjs/operators';

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

  public getSnapshots() {
    var aqId = 1;

    return this.http.get<AquariumSnapshot[]>(this._url + "/v1/Snapshot/" + aqId + "/All").toPromise();
  }
  public takeSnapshot() {
    var aqId = 1;
    return this.http.get<AquariumSnapshot[]>(this._url + "/v1/Snapshot/" + aqId + "/Take").toPromise();
  }
  public GetPhotoSource(snapshot: AquariumSnapshot) {
    if(snapshot.photoId != null)
      return this._url + "/photos/" + snapshot.aquariumId + "/" + snapshot.photoId + ".jpg";
    return null;
  }

  public getAquariums(): Observable<Aquarium[]> {
    return this.http.get<Aquarium[]>(this._url + "/v1/Aquarium/All");

  }
  public getAquariumById(aquariumId: number) {
    return this.http.get<Aquarium>(this._url + "/v1/Aquarium/" + aquariumId);
  }

  public updateAquarium(aquarium: Aquarium) {
    console.log(aquarium);
    return this.http.post<Aquarium>(this._url + "/v1/Aquarium/Update",aquarium);
  }
}