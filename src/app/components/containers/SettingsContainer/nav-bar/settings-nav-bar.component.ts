import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { Observable, Subject } from 'rxjs';
import { Aquarium } from 'src/app/models/Aquarium';
import { getSelectedAquarium, isLoadingAquariums } from 'src/app/store/aquarium/aquarium.selector';
import { AppState } from 'src/app/app.state';
import { take, takeUntil } from 'rxjs/operators';
import { AquariumService } from 'src/app/services/aquarium.service';
import { ManageSnapshotModal } from 'src/app/components/shared/modals/manage-snapshot-modal/manage-snapshot-modal.component';
import * as moment from 'moment';
import { FishCreateButtonComponent } from 'src/app/components/data/fish/create-button/fish-create-button.component';
import { AquariumAccount } from 'src/app/models/AquariumAccount';
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
    console.log("This is your role:",this.user.role);
    return this.user.role == 'Administrator';
  }
}