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
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'settings-logs',
  templateUrl: './settings-logs.component.html',
  styleUrls: ['./settings-logs.component.scss']
})


export class SettingsLogsComponent implements OnInit {

  faExclamationTriangle = faExclamationTriangle;

  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);

  private componentLifecycle$: Subject<SettingsLogsComponent> = new Subject();

  public aquariumApiLog$ = this._aquariumService.getApplicationLog();
  public deleting: boolean;
  public refreshing: boolean;

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private _aquariumService: AquariumService,
    private notifier: NotifierService
  ) { }

  ngOnInit() {
    this.clickGetApplicationLog();
  }

  ngOnDestroy() {
    this.componentLifecycle$.next();
    this.componentLifecycle$.unsubscribe();
  }

  clickDeleteApplicationLog() {
    this.deleting = true;
    this._aquariumService.deleteApplicationLog().subscribe(val => {
      this.deleting = false;
      this.notifier.notify('success', "Application log was deleted successfully");
    }, err => {
      this.notifier.notify('error', "Could not delete application log");
      this.deleting = false;
      console.log(err);
    });
  }
  clickGetApplicationLog() {
    this.refreshing = true;
    this.aquariumApiLog$ = this._aquariumService.getApplicationLog();

    this.aquariumApiLog$.subscribe(data => {
      this.refreshing = false;
    }, err => {
      this.refreshing = false;
      this.notifier.notify("error", "An error occured while retrieving the application log file");
      console.log(err);
    });
  }
}