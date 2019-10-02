import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { AquariumAccount } from '../models/AquariumAccount';
import { BugReport } from '../models/BugReport';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: "root"
})
export class AdminService {

  private _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.urls.aquariumApi;
  }
  public getAllAquariumAccounts() {
    return this.http.get<AquariumAccount[]>(this._url + "/v1/admin/Users");
  }
  public getAllBugReports() {
    return this.http.get<BugReport[]>(this._url + "/v1/admin/Bugs");
  }
}