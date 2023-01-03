import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { AquariumAccount } from '../modules/SharedDeviceModule/models/AquariumAccount';
import { BugReport } from '../models/BugReport';
import { AquariumApiEndpoints } from "../models/constants/AquariumApiEndpoints";
import { DispatchedNotification } from '../models/DispatchedNotification';
import { NotificationDispatchRequest } from '../models/NotificationDispatchRequest';


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
    return this.http.get<AquariumAccount[]>(this._url + AquariumApiEndpoints.ADMIN_RETRIEVE_ACCOUNTS);
  }
  public getAllBugReports() {
    return this.http.get<BugReport[]>(this._url + AquariumApiEndpoints.ADMIN_RETRIEVE_BUGS);
  }
  public getAllNotifications() {
    return this.http.get<DispatchedNotification[]>(this._url + AquariumApiEndpoints.ADMIN_RETRIEVE_NOTIFICATIONS);
  }
  public dispatchNotification(notificationRequest: NotificationDispatchRequest) {
    return this.http.post<DispatchedNotification[]>(this._url + AquariumApiEndpoints.ADMIN_NOTIFICATION_DISPATCH,notificationRequest);
  }
  public dismissDispatchedNotifications(ids: number[]) {
    return this.http.post<DispatchedNotification[]>(this._url + AquariumApiEndpoints.ADMIN_NOTIFICATION_DISMISS,ids);
  }
  public deleteDispatchedNotifications(ids: number[]) {
    return this.http.post(this._url + AquariumApiEndpoints.ADMIN_NOTIFICATION_DELETE_ALL,ids);
  }
}