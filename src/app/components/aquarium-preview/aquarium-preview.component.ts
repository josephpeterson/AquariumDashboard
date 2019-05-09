import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';

@Component({
  selector: 'aquarium-preview',
  templateUrl: './aquarium-preview.component.html',
  styleUrls: ['./aquarium-preview.component.scss']
})


export class AquariumPreviewComponent implements OnInit {
 

  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    
  }
}

