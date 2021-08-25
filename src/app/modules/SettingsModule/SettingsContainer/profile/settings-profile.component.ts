import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject } from 'rxjs';
import { Aquarium } from 'src/app/models/Aquarium';
import { getSelectedAquarium, isLoadingAquariums } from 'src/app/store/aquarium/aquarium.selector';
import { AppState } from 'src/app/app.state';
import { AquariumService } from 'src/app/services/aquarium.service';

@Component({
  selector: 'settings-profile',
  templateUrl: './settings-profile.component.html',
  styleUrls: ['./settings-profile.component.scss']
})


export class SettingsProfileComponent {

  faExclamationTriangle = faExclamationTriangle;

  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);
  public loading$: Observable<boolean> = this.store.select(isLoadingAquariums);

  private componentLifecycle$: Subject<SettingsProfileComponent> = new Subject();

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private aquariumService: AquariumService
  ) { }

  ngOnDestroy() {
    this.componentLifecycle$.next();
    this.componentLifecycle$.unsubscribe();
  }
}