import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { LightingConfiguration } from 'src/app/models/LightingConfiguration';

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
    return this.http.post<LightingConfiguration>(this._url + "/lighting", config, httpOptions).toPromise()
    .then((data) => {
        alert("here?!");
    })
    .catch((data) => {
        alert("I expected to get an error!");
        console.log(data);
    });
  }
}