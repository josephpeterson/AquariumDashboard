import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { Aquarium } from 'src/app/models/Aquarium';
import { BugReport } from 'src/app/models/BugReport';
import { AdminService } from 'src/app/services/admin.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBan, faSync } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DispatchedNotification } from 'src/app/models/DispatchedNotification';
import * as moment from 'moment';
import { NotificationTypes } from 'src/app/models/types/NotificationTypes';

@Component({
  selector: 'notifications-table',
  templateUrl: './notifications-table.component.html',
  styleUrls: ['./notifications-table.component.scss']
})
export class NotificationsTableComponent {


  public icon_delete:IconDefinition = faBan;
  public icon_retry:IconDefinition = faSync;

  public disabled: boolean = false;


  public loading: boolean;
  public error: HttpErrorResponse;
  public aquarium$: Observable<Aquarium>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private selection: SelectionModel<BugReport> = new SelectionModel<BugReport>(true, []);

  //Columns
  public columns: Array<any> = [
    { name: 'select', visible: true },
    { name: 'id', label: "Notification #", visible: true },
    { name: 'type', label: "Type", visible: true },
    { name: 'date', label: "Dispatch Date", visible: true },
    { name: 'expireDate', label: 'Expire Date', visible: true },
    { name: 'dispatcher', label: 'Dispatcher', visible: true },
    { name: 'notified', label: 'Notified Users', visible: true },
  ];


  @Input() displayedColumns: any[] = this.columns.filter(col => col.visible).map(col => col.name);
  @Input() searchBox: HTMLInputElement;

  //Event handlers
  @Output() rowClicked = new EventEmitter();

  public dataSource: MatTableDataSource<DispatchedNotification> = new MatTableDataSource<DispatchedNotification>();

  constructor(private adminService: AdminService,private authService: AuthService) {
  }
  ngOnInit() {
    if (this.searchBox)
      this.bindSearchBox();

    this.loadNotifications();

    this.dataSource.paginator = this.paginator;
  }
  loadNotifications() {
    this.loading = true;
    this.adminService.getAllNotifications().subscribe(data => {
      this.dataSource.data = data;
      this.loading = false;
    },(err: HttpErrorResponse) => {
      this.loading = false;
      console.log("Could not load bug reports:",err);
      this.error = err;
    });
  }

  updateSort() {
    this.dataSource.sort = this.sort;
  }
  toggleSelection(row) {
    this.selection.toggle(row);
  }
  getSelectedItems() {
    return this.selection.selected;
  }
  //Search Support
  bindSearchBox() {
    this.searchBox.addEventListener("keyup", this.applyFilter.bind(this));
    this.searchBox.value = this.dataSource.filter;
  }
  getFilterString() {
    return this.searchBox.value.trim().toLowerCase();
  }
  applyFilter() {
    this.dataSource.filter = this.getFilterString();
  }
  rowClickHandler(event: MouseEvent, row: BugReport) {
    this.rowClicked.emit([event, row]);
    this.toggleSelection(row);
  }
  readableDate(dateString: string) {
    var d = moment.utc(dateString ).local().format('YYYY-MM-DD HH:mm:ss');
    return moment(d).calendar();
  }
  readableNotificationType(type) {
    for(var t in NotificationTypes) {
      if(NotificationTypes[t] == type)
        return t;
    }
    return "N/A";
  }

  public clickDismissNotifications() {
    var notifications = this.getSelectedItems();
    var ids = notifications.map(n => n.id);

    this.disabled = true;
    this.adminService.dismissDispatchedNotifications(ids).subscribe(data => {
      this.disabled = false;
      this.loadNotifications();
    },err => {
      this.disabled = false;
      this.error = err.message;
      console.log(err);
    });
  }
}