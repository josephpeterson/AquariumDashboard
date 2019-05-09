import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';

@Component({
  selector: 'fish-page-component',
  templateUrl: './fish.component.html',
  styleUrls: ['./fish.component.scss']
})


export class FishComponent implements OnInit {
 

  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    
  }
}

