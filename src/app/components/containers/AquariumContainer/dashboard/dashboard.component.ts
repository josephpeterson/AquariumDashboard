import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'dashboard-page-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
 
  faExclamationTriangle  = faExclamationTriangle;
  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    
  }
}

