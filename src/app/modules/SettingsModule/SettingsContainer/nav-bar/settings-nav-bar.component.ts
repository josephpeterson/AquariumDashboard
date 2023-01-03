import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject } from 'rxjs';
import { Aquarium } from 'src/app/models/Aquarium';
import { getSelectedAquarium, isLoadingAquariums } from 'src/app/store/aquarium/aquarium.selector';
import { AppState } from 'src/app/app.state';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumAccount } from 'src/app/modules/SharedDeviceModule/models/AquariumAccount';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'settings-nav-bar',
  templateUrl: './settings-nav-bar.component.html',
  styleUrls: ['./settings-nav-bar.component.scss']
})


export class SettingsNavBarComponent {

  faExclamationTriangle = faExclamationTriangle;

  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);
  public loading$: Observable<boolean> = this.store.select(isLoadingAquariums);

  private componentLifecycle$: Subject<SettingsNavBarComponent> = new Subject();
  public user: AquariumAccount;

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private aquariumService: AquariumService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.user = this.auth.getUser();
  }

  ngOnDestroy() {
    this.componentLifecycle$.next();
    this.componentLifecycle$.unsubscribe();
  }

  public isAdministrator() {
    return this.user.role == 'Administrator';
  }
}