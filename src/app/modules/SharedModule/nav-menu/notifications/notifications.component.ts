import { Component, OnInit, ElementRef } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { AquariumService } from 'src/app/services/aquarium.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Notification } from 'src/app/models/Notification';
import * as moment from 'moment';
import { NotificationTypes } from 'src/app/models/types/NotificationTypes';
import { MatDialog } from '@angular/material';
import { ConfirmModalComponent } from '../../modals/confirm-modal/confirm-modal.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'nav-menu-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class NavMenuNotificationsComponent implements OnInit {

  public faBell = faBell;
  public open: boolean;
  public notifications: Notification[] = [];
  public types = NotificationTypes;
  public loading: boolean;
  public error: boolean;
  public componentLifeCycle$ = new Subject();

  public notificationTick;

  private interval: number = 30;

  constructor(private _aquariumService: AquariumService,
    private _eref: ElementRef,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.loadNotifications();
    console.log(this.types.TestNotification);
  }

  public onClick(event) {
    if (!this._eref.nativeElement.contains(event.target) && this.open) // or some similar check
      this.clickToggleOpen();
  }
  public clickToggleOpen() {
    this.open = !this.open;

    if (this.open) {
      this.dismissCurrentNotifications();
    }
  }

  public dismissCurrentNotifications() {
    var notifs = this.getUndismissedNotifications();
    var notifIds = notifs.map(n => n.id);
    console.log(notifIds);
    if (notifIds.length)
      this._aquariumService.dismissNotifications(notifIds).subscribe(() => {
        //Delay
        setTimeout(() => {
          notifs.forEach(n => {
            n.dismissed = true;
          });
        }, 5000);
      },
        (err: HttpErrorResponse) => {
          console.error(err);
        });
  }
  public getUndismissedNotifications() {
    return this.notifications.filter(n => !n.dismissed);
  }

  public loadNotifications() {
    if(this.error)
      return;
    clearInterval(this.notificationTick);
    this.loading = true;
    this._aquariumService.getNotifications().subscribe((notifications: Notification[]) => {
      this.loading = false;
      this.notifications = notifications;
    },
      (err: HttpErrorResponse) => {
        this.loading = false;
        //console.error(err);
        this.error = true;

        //todo: dont just clear the interval
        clearInterval(this.notificationTick);
      });
    this.notificationTick = setTimeout(() => {
      this.loadNotifications();
    }, this.interval * 1000);
  }
  public clickNotification(n: Notification) {
    var d = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: n.source.title,
        body: n.source.body
      }
    }).componentInstance;
    d.title = n.source.title;
    d.body = n.source.body;
  }
  readableDate(dateString: string) {
    var d = moment.utc(dateString).local().format('YYYY-MM-DD HH:mm:ss');
    return moment(d).calendar();
  }
  public parseDynamicTitle(n: Notification) {
    var con = n.source.title;
    if (!con) return;

    return con.replace(/{target.name}/gi, n.target.username)
      .replace(/{dispatcher.name}/gi, n.source.dispatcher.username);
  }
  public parseDynamicContent(n: Notification) {
    var con = n.source.subtitle;
    if (!con) return;

    return con.replace(/{target.name}/gi, n.target.username)
      .replace(/{dispatcher.name}/gi, n.source.dispatcher.username);
  }
  ngOnDestory() {
    this.componentLifeCycle$.next();
    this.componentLifeCycle$.unsubscribe();
}
}
