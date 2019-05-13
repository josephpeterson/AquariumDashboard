import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { LightingConfiguration } from 'src/app/models/LightingConfiguration';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  

@Injectable({
  providedIn: "root"
})
export class AquariumService {
  private _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.urls.aquariumApi;
  }

  public SendLightingConfiguration(config: LightingConfiguration)
  {
    return this.http.post<LightingConfiguration>(this._url + "/v1/lighting", config, httpOptions).toPromise()
    .then((data) => {
        alert("here?!");
    })
    .catch((data) => {
        alert("I expected to get an error!");
        console.log(data);
    });
  }

  public GetSnapshots()
  {
    var aqId = 1;

    return this.http.get<AquariumSnapshot[]>(this._url + "/v1/Snapshot/" + aqId + "/All").toPromise();
  }
  public TakeSnapshot() {
    var aqId = 1;
    return this.http.get<AquariumSnapshot[]>(this._url + "/v1/Snapshot/" + aqId + "/Take").toPromise();
  }
  public GetPhotoSource(snapshot: AquariumSnapshot)
  {
    return this._url + "/photos/" + snapshot.aquariumId + "/" + snapshot.id + ".jpg";
  }
}