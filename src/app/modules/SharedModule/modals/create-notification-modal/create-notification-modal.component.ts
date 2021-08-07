import { Component, OnInit } from '@angular/core';
import { BugReport } from 'src/app/models/BugReport';
import { AquariumService } from 'src/app/services/aquarium.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DispatchedNotification } from 'src/app/models/DispatchedNotification';
import { NotificationDispatchRequest } from 'src/app/models/NotificationDispatchRequest';
import { NotificationTypes } from 'src/app/models/types/NotificationTypes';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'create-notification-modal',
  templateUrl: './create-notification-modal.component.html',
  styleUrls: ['./create-notification-modal.component.scss']
})
export class CreateNotificationModalComponent implements OnInit {

  public notification: DispatchedNotification = new DispatchedNotification();
  public audienceSelection: number = 0;
  public error: string;
  public disabled: boolean;


  public notificationTypes = NotificationTypes;

  constructor(private _adminService: AdminService,
    private _self: MatDialogRef<CreateNotificationModalComponent>) { }

  ngOnInit() {
    console.log(this.notificationTypes);
  }

  public clickSubmit() {

    var req = new NotificationDispatchRequest();

    req.notification = this.notification;

    console.log(req);

    delete this.error;
    this.disabled = true;

    this._adminService.dispatchNotification(req).subscribe(notification => {
      this.disabled = false;
      this._self.close(notification);
    }, err => {
      this.error = err.message;
      this.disabled = false;
    });
    return true;
  }
}
