import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})


export class TaskListComponent implements OnInit {
 

  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    
  }
}

