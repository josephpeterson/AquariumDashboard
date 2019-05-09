import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';

@Component({
  selector: 'aquarium-preview-scroller',
  templateUrl: './aquarium-preview-scroller.component.html',
  styleUrls: ['./aquarium-preview-scroller.component.scss']
})


export class AquariumPreviewScrollerComponent implements OnInit {
 

  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    
  }
}

