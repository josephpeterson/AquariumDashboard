import { Fish } from 'src/app/models/Fish';
import { Component, ViewChild, Input, Output } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { EventEmitter } from '@angular/core';
import { SpeciesTableComponentData } from './species-table.component.data';
import { Species } from 'src/app/models/Species';

@Component({
  selector: 'species-table',
  templateUrl: './species-table.component.html',
  styleUrls: ['./species-table.component.scss']
})
export class SpeciesTableComponent {

  public loading$ = this.dataSource.loading$;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private selection: SelectionModel<Species> = new SelectionModel<Species>(true, []);

  //Columns
  public columns: Array<any> = [
    { name: 'select', visible: false },
    { name: 'id', label: "ID", visible: true },
    { name: 'name', label: 'Full Name', visible: true },
    { name: 'description', label: 'Description', visible: true },
    { name: 'website', label: 'Website', visible: true },
    { name: 'fishCount', label: 'Alive Fish', visible: true },
    { name: 'aquariumCount', label: 'Aquariums', visible: true },
  ];

  @Input() displayedColumns: any[] = this.columns.filter(col => col.visible).map(col => col.name);
  @Input() searchBox: HTMLInputElement;

  //Event handlers
  @Output() rowClicked = new EventEmitter();

  constructor(private dataSource: SpeciesTableComponentData){}
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
  rowClickHandler(event: MouseEvent,row: Species) {
    console.log(row);
    this.rowClicked.emit([event,row]);
  }
}