import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Aquarium } from 'src/app/models/Aquarium';
import { WaterChange } from 'src/app/models/WaterChange';
import { SelectionModel } from '@angular/cdk/collections';
import { AquariumService } from 'src/app/services/aquarium.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSort, MatTableDataSource } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'standard-table',
  templateUrl: './standard-table.component.html',
  styleUrls: ['./standard-table.component.scss']
})
export class StandardTableComponent implements OnInit {
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  public loading: boolean = false;

  @Input("columns") public columns: Array<any> = [
    { property: 'select', name: 'select', visible: true, value: (column, element) => element[column.property] },
  ];
  @Input() public callback: Function;

  private selection: SelectionModel<any> = new SelectionModel<WaterChange>(true, []);
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.loadDataSource();
  }
  loadDataSource() {
    if (!this.callback)
      return;
    this.loading = true;
    this.callback().subscribe(data => {
      this.dataSource = data;
      this.loading = false;
      console.log(data);
    },
      (err: HttpErrorResponse) => {
        console.error(err);
        this.loading = false;
      });
  }
  public toggleSelection(row) {
    this.selection.toggle(row);
  }
  public getSelectedItems() {
    return this.selection.selected;
  }
  public getDisplayedColumns() {
    return this.columns.filter(col => col.visible).map(col => col.name);
  }
  public updateSort() {
    this.dataSource.sort = this.sort;
  }
  readableDate(dateString: string) {
    var d = moment.utc(dateString).local().format('YYYY-MM-DD HH:mm:ss');
    return moment(d).calendar();
  }
}
