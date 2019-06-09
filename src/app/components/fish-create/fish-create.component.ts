import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';

@Component({
  selector: 'fish-create-component',
  templateUrl: './fish-create.component.html',
  styleUrls: ['./fish-create.component.scss']
})


export class FishCreateComponent implements OnInit {
 

  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    
  }
}

