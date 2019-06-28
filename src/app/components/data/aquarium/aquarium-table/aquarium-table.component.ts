import { Component, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";
import { Observable, Subject } from 'rxjs';
import { isLoadingAquariums, getAllAquariums } from 'src/app/store/aquarium/aquarium.selector';
import { Aquarium } from 'src/app/models/Aquarium';
import { Species } from 'src/app/models/Species';
import { getAllSpecies } from 'src/app/store/species/species.selector';
import { SpeciesTableComponentData } from '../../species/species-table/species-table.component.data';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material';
import { AquariumListAction } from 'src/app/store/aquarium/aquarium.actions';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'aquarium-table',
  templateUrl: './aquarium-table.component.html',
  styleUrls: ['./aquarium-table.component.scss']
})
export class AquariumTableComponent {

  public loading$: Observable<Boolean> = this.store.select(isLoadingAquariums);
  public aquariums$: Observable<Aquarium[]> = this.store.select(getAllAquariums);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private selection: SelectionModel<Aquarium> = new SelectionModel<Aquarium>(true, []);


  //Columns
  public columns: Array<any> = [
    { name: 'select', visible: false },
    { name: 'id', label: "ID", visible: true },
    { name: 'name', label: 'Aquarium Name', visible: true },
  ];

  @Input() displayedColumns: any[] = this.columns.filter(col => col.visible).map(col => col.name);
  @Input() searchBox: HTMLInputElement;

  //Event handlers
  @Output() rowClicked = new EventEmitter();

  public dataSource: MatTableDataSource<Aquarium> = new MatTableDataSource<Aquarium>();
  private componentLifecycle = new Subject();

  constructor(private store: Store<AppState>) { }
  ngOnInit() {
    if (this.searchBox)
      this.bindSearchBox();

    this.dataSource.paginator = this.paginator;

    this.aquariums$.pipe(takeUntil(this.componentLifecycle)).subscribe(aquariums => {
      if(aquariums.length < 2)
        this.store.dispatch(new AquariumListAction());
      if(aquariums) this.dataSource.data = aquariums;
    });
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
  rowClickHandler(event: MouseEvent, row: Aquarium) {
    this.rowClicked.emit([event, row]);
  }
}
