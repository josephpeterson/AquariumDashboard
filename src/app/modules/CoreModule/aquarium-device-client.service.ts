import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedDeviceModule } from "../SharedDeviceModule/shared-device.module";
import { environment } from '../../../environments/environment';
import { DeviceEndpoints } from '../SharedDeviceModule/models/DeviceEndpoints';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getDeployedDeviceInformation } from 'src/app/store/aquarium/aquarium.selector';
/* This file is treated as an interface. AquariumDashboard has an implementation and DeviceAPI Dashboard has one as well. 
    This allows us to completely copy the SharedDeviceModule over with ease.
*/


@Injectable({
    providedIn: SharedDeviceModule,
})
export class AquariumDeviceHttpClient {
    private _url: string;
    public aquariumId$ = this.store.select((state => state.aquariums.selectedAquariumId));

    constructor(private http: HttpClient,
        public store: Store<AppState>
    ) {
        this.aquariumId$.subscribe(id => {
            this._url = `${environment.urls.aquariumApi}/DeviceInteraction/${id}/`;
        });
    }
    public get<T>(endpoint: DeviceEndpoints, body?: object): Observable<T> {
        return this.http.get<T>(`${this._url}${endpoint}`, body);
    }
    public post<T>(endpoint: DeviceEndpoints, body?: object): Observable<T> {
        return this.http.post<T>(this._url + endpoint, body);
    }
    public put<T>(endpoint: DeviceEndpoints, body?: object) {
        return this.http.put<T>(this._url + endpoint, body);
    }
    public delete(endpoint: DeviceEndpoints, body?: object) {
        return this.http.delete(this._url + endpoint, body);
    }
}