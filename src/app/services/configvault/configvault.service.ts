import { catchError, tap } from "rxjs/operators";

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Token } from "./token";

@Injectable()
export class ConfigVaultService {
  private _urlForEnvironment: {
    DEV: string;
    SIT: string;
    UAT: string;
    PROD: string;
  };

  constructor(private http: HttpClient) {
    this._urlForEnvironment = { DEV: "", SIT: "", UAT: "", PROD: "" };
    // this._urlForEnvironment['DEV'] = 'http://localhost:3481/v1/Token';
    this._urlForEnvironment.DEV =
      "https://devconfigvaultservice.es.rwbaird.com/configvaultservice/v1/Token";
    this._urlForEnvironment.SIT =
      "https://sitconfigvaultservice.es.rwbaird.com/configvaultservice/v1/Token";
    this._urlForEnvironment.UAT =
      "https://uatconfigvaultservice.es.rwbaird.com/configvaultservice/v1/Token";
    this._urlForEnvironment.PROD =
      "https://configvaultservice.es.rwbaird.com/configvaultservice/v1/Token";
  }

  public getToken(appName: string, environment: string): Observable<Token> {
    const token = this.getTokenFromCache(appName, environment);
    if (token != null) {
      const observable = new Observable<Token>(observer => {
        observer.next(token);
        observer.complete();
      });
      return observable;
    }

    return this.getTokenFromConfigVault(appName, environment);
  }

  private getTokenFromConfigVault(
    appName: string,
    environment: string
  ): Observable<Token> {
    const url = `${this._urlForEnvironment[environment]}/${appName}`;
    console.log(`configvault.service calling ${url}`);

    return this.http
      .get<Token>(url, {
        withCredentials: true,
        params: new HttpParams().set("tokenname", "NewAccessToken")
      })
      .pipe(tap(token => this.storeTokenInCache(appName, environment, token)));
  }

  private getTokenFromCache(appName: string, environment: string): Token {
    const json = sessionStorage.getItem(
      this.getTokenCacheKey(appName, environment)
    );
    if (json != null) {
      const token = JSON.parse(json) as Token;
      const now = new Date();
      const expires = new Date(token.ExpiresOn);
      console.log(`comparing ${expires} > ${now}`);
      if (expires > now) {
        console.log(`configvault.service using cached token ${json}`);
        return token;
      } else {
        console.log(`configvault.service cached access token expired`);
      }
    }
    return null;
  }

  private storeTokenInCache(
    appName: string,
    environment: string,
    token: Token
  ) {
    const json = JSON.stringify(token);
    console.log(`configvault.service retrieved token ${json}`);
    sessionStorage.setItem(this.getTokenCacheKey(appName, environment), json);
  }

  private getTokenCacheKey(appName: string, environment: string): string {
    return `${environment}-${appName}-Token`;
  }
}
