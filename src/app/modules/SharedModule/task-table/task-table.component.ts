import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AquariumTask } from 'src/app/models/AquariumTask';

const ELEMENT_DATA: AquariumTask[] = [
  {id: 1, priority: 1, type: "Water Change",issueDate: new Date(),dueDate: new Date()},
  {id: 1, priority: 1, type: "Parameter Test",issueDate: new Date(),dueDate: new Date()},
  {id: 1, priority: 1, type: "Feed Fish",issueDate: new Date(),dueDate: new Date()},
  {id: 1, priority: 1, type: "Parameter Test",issueDate: new Date(),dueDate: new Date()},
  {id: 1, priority: 1, type: "Water Change",issueDate: new Date(),dueDate: new Date()},
  {id: 1, priority: 1, type: "Water Change",issueDate: new Date(),dueDate: new Date()},
];



@Component({
  selector: 'task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})

export class TaskTableComponent implements OnInit {
 
  displayedColumns: string[] = ['position', 'name', 'symbol'];
  dataSource = ELEMENT_DATA;
  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    
  }
}

