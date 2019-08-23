import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AquariumAccount } from '../models/AquariumAccount';
import { SignupRequest } from '../models/SignupRequest';

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private _url: string;

  public aquariumId: number;
  private jwtHelper: JwtHelperService;

  constructor(private http: HttpClient) {
    this._url = environment.urls.aquariumApi;
    this.jwtHelper = new JwtHelperService();
  }

  public storeToken(token) {
    localStorage["aquariumapitoken"] = token;
  }
  public getToken() {
    return localStorage["aquariumapitoken"];
  }
  public clearToken() {
    return delete localStorage["aquariumapitoken"];
  }
  public isAuthenticated() {
    var token = this.getToken();
    if (token && !this.jwtHelper.isTokenExpired(token))
      return true;
    return false;
  }
  public login(email: string, password: string) {
    var req = this.http.post(this._url + `/v1/Auth/Login`, {
      email: email,
      password: password
    });
    var a = new Subject();
    req.subscribe((response: TokenResponse) => {
      this.storeToken(response.token);
      a.next(this.getUser());
    },
      err => {
        a.error(err);
      });
    return a;
  }
  public signup(signupRequest: SignupRequest) {
    var req = this.http.post(this._url + `/v1/Auth/Signup`, signupRequest);
    var a = new Subject();
    req.subscribe((response: TokenResponse) => {
      this.storeToken(response.token);
      a.next(this.getUser());
    },
      err => {
        a.error(err);
      });
    return a;
  }
  public getUser(): AquariumAccount {
    var data = this.jwtHelper.decodeToken(this.getToken());

    var user = new AquariumAccount();
    user.id = data["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    user.username = data["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    user.role = data["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    user.email = data["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    return user;
  }
}
class TokenResponse {
  public token;
}