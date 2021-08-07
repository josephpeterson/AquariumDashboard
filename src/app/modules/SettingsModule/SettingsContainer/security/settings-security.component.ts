import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject } from 'rxjs';
import { Aquarium } from 'src/app/models/Aquarium';
import { getSelectedAquarium, isLoadingAquariums } from 'src/app/store/aquarium/aquarium.selector';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'settings-security',
  templateUrl: './settings-security.component.html',
  styleUrls: ['./settings-security.component.scss']
})


export class SettingsSecurityComponent {

  faExclamationTriangle = faExclamationTriangle;

  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);
  public loading$: Observable<boolean> = this.store.select(isLoadingAquariums);

  private componentLifecycle$: Subject<SettingsSecurityComponent> = new Subject();

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>  ) { }

  ngOnDestroy() {
    this.componentLifecycle$.next();
    this.componentLifecycle$.unsubscribe();
  }
}