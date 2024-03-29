import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AquariumAccount } from '../modules/SharedDeviceModule/models/AquariumAccount';
import { SignupRequest } from '../models/SignupRequest';
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { AuthSetAuthenticatedUserAction } from "../store/auth/auth.actions";
import { AquariumApiEndpoints } from "../models/constants/AquariumApiEndpoints";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private _url: string;

  public aquariumId: number;
  private jwtHelper: JwtHelperService;

  constructor(private http: HttpClient,
    private store: Store<AppState>) {
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
    this.store.dispatch(new AuthSetAuthenticatedUserAction(null));
    return delete localStorage["aquariumapitoken"];
  }
  public isAuthenticated() {
    var token = this.getToken();
    if (token && !this.jwtHelper.isTokenExpired(token))
      return true;
    return false;
  }
  public login(email: string, password: string) {
    var req = this.http.post(this._url + AquariumApiEndpoints.AUTH_LOGIN, {
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
    var req = this.http.post(this._url + AquariumApiEndpoints.AUTH_SIGNUP, signupRequest);
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
    var token = this.getToken();
    var data = this.jwtHelper.decodeToken(token);
    
    if (!data || this.jwtHelper.isTokenExpired(token)) {
      this.store.dispatch(new AuthSetAuthenticatedUserAction(null));
      return;
    }


    var user = new AquariumAccount();
    user.id = data["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    user.username = data["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    user.role = data["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    user.email = data["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];

    this.store.dispatch(new AuthSetAuthenticatedUserAction(user));
    return user;
  }



  //Password
  public resetPasswordHandshake(resetToken: string) {
    var req = this.http.post(this._url + AquariumApiEndpoints.AUTH_PASSWORD_RESET_UPGRADE, {
      token: resetToken
    });
    var a = new Subject<string>();
    req.subscribe((response: TokenResponse) => {
      a.next(response.token);
    },
      err => {
        a.error(err);
      });
    return a;
  }
  public submitPasswordResetRequest(requestToken: string, newPassword: string) {
    var req = this.http.post(this._url + AquariumApiEndpoints.AUTH_PASSWORD_RESET_SUBMIT, {
      token: requestToken,
      password: newPassword
    });
    var a = new Subject();
    req.subscribe((response: AquariumAccount) => {
      a.next(response);
    },
      err => {
        a.error(err);
      });
    return a;
  }
}
class TokenResponse {
  public token;
}