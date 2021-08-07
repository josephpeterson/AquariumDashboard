import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { Observable, Subject } from 'rxjs';
import { Aquarium } from 'src/app/models/Aquarium';
import { getSelectedAquarium, isLoadingAquariums } from 'src/app/store/aquarium/aquarium.selector';
import { AppState } from 'src/app/app.state';
import { take, takeUntil } from 'rxjs/operators';
import { AquariumService } from 'src/app/services/aquarium.service';
import { ManageSnapshotModal } from 'src/app/modules/SharedModule/modals/manage-snapshot-modal/manage-snapshot-modal.component';
import * as moment from 'moment';
import { FishCreateButtonComponent } from 'src/app/modules/SharedModule/data/fish/create-button/fish-create-button.component';

@Component({
  selector: 'settings-privacy',
  templateUrl: './settings-privacy.component.html',
  styleUrls: ['./settings-privacy.component.scss']
})


export class SettingsPrivacyComponent {

  faExclamationTriangle = faExclamationTriangle;

  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);
  public loading$: Observable<boolean> = this.store.select(isLoadingAquariums);

  private componentLifecycle$: Subject<SettingsPrivacyComponent> = new Subject();

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