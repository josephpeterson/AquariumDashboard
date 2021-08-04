const ELEMENT_DATA = [
  {id: 1, username: 'Hydrogen', email: 'Hsd99jsdknakd@gmail.com'},
  {id: 2, username: 'Helium', email: 'Hesd99jsdknakd@gmail.com'},
  {id: 3, username: 'Lithium', email: 'Lisd99jsdknakd@gmail.com'},
  {id: 4, username: 'Beryllium', email: 'Besd99jsdknakd@gmail.com'},
  {id: 5, username: 'Boron', email: 'Bsd99jsdknakd@gmail.com'},
  {id: 6, username: 'Carbon', email: 'Csd99jsdknakd@gmail.com'},
  {id: 7, username: 'Nitrogen', email: 'Nsd99jsdknakd@gmail.com'},
  {id: 8, username: 'Oxygen', email: 'Osd99jsdknakd@gmail.com'},
  {id: 9, username: 'Fluorine', email: 'Fsd99jsdknakd@gmail.com'},
  {id: 10, username: 'Neon', email: 'Nesd99jsdknakd@gmail.com'},
];

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject } from 'rxjs';
import { Aquarium } from 'src/app/models/Aquarium';
import { getSelectedAquarium, isLoadingAquariums } from 'src/app/store/aquarium/aquarium.selector';
import { AppState } from 'src/app/app.state';
import { AquariumService } from 'src/app/services/aquarium.service';

import { AquariumAccount } from 'src/app/models/AquariumAccount';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'settings-bugs',
  templateUrl: './settings-bugs.component.html',
  styleUrls: ['./settings-bugs.component.scss']
})
export class SettingsBugsComponent {

  displayedColumns: string[] = ['username', 'email'];
  dataSource = ELEMENT_DATA;

  faExclamationTriangle = faExclamationTriangle;

  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);
  public loading$: Observable<boolean> = this.store.select(isLoadingAquariums);

  private componentLifecycle$: Subject<SettingsBugsComponent> = new Subject();

  public aquariumApiLog$ = this._aquariumService.getApplicationLog();

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private _aquariumService: AquariumService,
    private notifier: NotificationService
  ) { }

  ngOnDestroy() {
    this.componentLifecycle$.next();
    this.componentLifecycle$.unsubscribe();
  }
}