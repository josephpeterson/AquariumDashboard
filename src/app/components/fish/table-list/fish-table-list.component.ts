import { FishTableListComponentData } from './fish-table-list.component.data';
import { Fish } from 'src/app/models/Fish';
import { Component, ViewChild, Input, Output } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { EventEmitter } from 'events';

@Component({
  selector: 'fish-table-list',
  templateUrl: './fish-table-list.component.html',
  styleUrls: ['./fish-table-list.component.scss']
})
export class FishTableListComponent {

  public loading$ = this.dataSource.loading$;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private selection: SelectionModel<Fish> = new SelectionModel<Fish>(true, []);

  //Columns
  public columns: Array<any> = [
    { name: 'select', visible: true },
    { name: 'id', label: "ID", visible: true },
    { name: 'name', label: 'Full Name', visible: true },
    { name: 'description', label: 'Description', visible: true },
    { name: 'date', label: 'Adoption Date', visible: true },
    { name: 'speciesId', label: 'Species Id', visible: true },
    { name: 'aquariumId', label: 'Assigned Aquarium', visible: false },
  ];

  @Input() displayedColumns: any[] = this.columns.filter(col => col.visible).map(col => col.name);
  @Input() searchBox: HTMLInputElement;

  //Event handlers
  @Output() rowClicked:EventEmitter = new EventEmitter();

  constructor(private dataSource: FishTableListComponentData){}
  ngOnInit() {
    if (this.searchBox)
      this.bindSearchBox();

    this.dataSource.paginator = this.paginator;
    
  }
  updateSort() {
    this.dataSource.sort = this.sort;
  }
  toggleSelection(row) {
    this.selection.clear();
    this.selection.toggle(row);
  }
  getSelectedItems() {
    return this.selection.selected[0];
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
  rowClickHandler(event: MouseEvent,row: Fish) {
    //this.rowClicked.emit([event,row]);
  }
}
