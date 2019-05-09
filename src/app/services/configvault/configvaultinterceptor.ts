import { Injectable, Injector } from "@angular/core";
import { mergeMap, tap } from "rxjs/operators";

import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Token } from "./token";

@Injectable()
export class ConfigVaultInterceptor implements HttpInterceptor {
  private _urlForEnvironment: {
    LOCAL: string;
    DEV: string;
    SIT: string;
    UAT: string;
    PROD: string;
  };

  constructor(private injector: Injector) {
    this._urlForEnvironment = {
      LOCAL: "",
      DEV: "",
      SIT: "",
      UAT: "",
      PROD: ""
    };
    this._urlForEnvironment.LOCAL =
      "https://devconfigvaultservice.es.rwbaird.com/configvaultservice/v1/Token";
    this._urlForEnvironment.DEV =
      "https://devconfigvaultservice.es.rwbaird.com/configvaultservice/v1/Token";
    this._urlForEnvironment.SIT =
      "https://sitconfigvaultservice.es.rwbaird.com/configvaultservice/v1/Token";
    this._urlForEnvironment.UAT =
      "https://uatconfigvaultservice.es.rwbaird.com/configvaultservice/v1/Token";
    this._urlForEnvironment.PROD =
      "https://configvaultservice.es.rwbaird.com/configvaultservice/v1/Token";
  }

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const environment = this.injector.get("OAuth.Environment");
    const appName = this.injector.get("OAuth.ClientName");

    // Only apply to gateway API URLs
    if (request.url.indexOf("api.rwbaird.com") === -1) {
      const clonedRequest = request.clone({ withCredentials: true });
      return next.handle(clonedRequest);
    }

    console.log(`intercepted API ${request.url}`);

    const token = this.getTokenFromCache(appName, environment);
    if (token != null) {
      const clonedRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${token.AccessToken}` }
      });
      console.log(`resuming API ${request.url} with token`);
      return next.handle(clonedRequest);
    }

    const http = this.injector.get(HttpClient);

    const url = `${
      this._urlForEnvironment[environment]
    }/${appName}?tokenname=NewAccessToken`; 
    return http
      .get<Token>(url, { withCredentials: true })
      .pipe(tap(tok => this.storeTokenInCache(appName, environment, tok)))
      .pipe(
        mergeMap(tok => {
          const clonedRequest = request.clone({
            setHeaders: { Authorization: `Bearer ${tok.AccessToken}` }
          });
          console.log(`resuming API ${request.url} with token`);
          return next.handle(clonedRequest);
        })
      );
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
