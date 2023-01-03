const ELEMENT_DATA = [
  { id: 1, username: 'Hydrogen', email: 'Hsd99jsdknakd@gmail.com' },
  { id: 2, username: 'Helium', email: 'Hesd99jsdknakd@gmail.com' },
  { id: 3, username: 'Lithium', email: 'Lisd99jsdknakd@gmail.com' },
  { id: 4, username: 'Beryllium', email: 'Besd99jsdknakd@gmail.com' },
  { id: 5, username: 'Boron', email: 'Bsd99jsdknakd@gmail.com' },
  { id: 6, username: 'Carbon', email: 'Csd99jsdknakd@gmail.com' },
  { id: 7, username: 'Nitrogen', email: 'Nsd99jsdknakd@gmail.com' },
  { id: 8, username: 'Oxygen', email: 'Osd99jsdknakd@gmail.com' },
  { id: 9, username: 'Fluorine', email: 'Fsd99jsdknakd@gmail.com' },
  { id: 10, username: 'Neon', email: 'Nesd99jsdknakd@gmail.com' },
];

import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject } from 'rxjs';
import { Aquarium } from 'src/app/models/Aquarium';
import { getSelectedAquarium, isLoadingAquariums } from 'src/app/store/aquarium/aquarium.selector';
import { AppState } from 'src/app/app.state';
import { AquariumService } from 'src/app/services/aquarium.service';

import { AquariumAccount } from 'src/app/modules/SharedDeviceModule/models/AquariumAccount';
import { CreateNotificationModalComponent } from 'src/app/modules/SharedModule/modals/create-notification-modal/create-notification-modal.component';
import { NotificationsTableComponent } from './notifications-table/notifications-table.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'settings-notifications',
  templateUrl: './settings-notifications.component.html',
  styleUrls: ['./settings-notifications.component.scss']
})
export class SettingsNotificationsComponent {

  displayedColumns: string[] = ['username', 'email'];
  dataSource = ELEMENT_DATA;

  faExclamationTriangle = faExclamationTriangle;

  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);
  public loading$: Observable<boolean> = this.store.select(isLoadingAquariums);

  private componentLifecycle$: Subject<SettingsNotificationsComponent> = new Subject();


  @ViewChild(NotificationsTableComponent) notificationTable: NotificationsTableComponent;

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private _aquariumService: AquariumService,
    private notifier: NotificationService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnDestroy() {
    this.componentLifecycle$.next();
    this.componentLifecycle$.unsubscribe();
  }

  public clickCreateNotification() {
    this.dialog.open(CreateNotificationModalComponent, {
    }).afterClosed().subscribe(n => {
      this.notificationTable.loadNotifications();
    });
  }
}