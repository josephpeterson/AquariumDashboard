import { Component, OnInit, ElementRef } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { AquariumService } from 'src/app/services/aquarium.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Notification } from 'src/app/models/Notification';
import * as moment from 'moment';

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
  public loading: boolean;

  private interval: number = 30;

  constructor(private _aquariumService: AquariumService,
    private _eref: ElementRef) { }

  ngOnInit() {
    this.loadNotifications();
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
    this.loading = true;
    this._aquariumService.getNotifications().subscribe((notifications: Notification[]) => {
      this.loading = false;
      this.notifications = notifications;
    },
      (err: HttpErrorResponse) => {
        this.loading = false;
        console.error(err);
      });
    setTimeout(() => {
      this.loadNotifications();
    }, this.interval * 1000);
  }
  public clickNotification(n: Notification) {

  }
  readableDate(dateString: string) {
    var d = moment.utc(dateString ).local().format('YYYY-MM-DD HH:mm:ss');
    return moment(d).calendar();
  }
}
