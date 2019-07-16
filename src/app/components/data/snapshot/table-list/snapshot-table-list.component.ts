import { Fish } from 'src/app/models/Fish';
import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { getAquariumById, isLoadingAquariums } from 'src/app/store/aquarium/aquarium.selector';
import { AquariumLoadByIdAction } from 'src/app/store/aquarium/aquarium.actions';
import { takeUntil, take } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { Observable, Subject } from 'rxjs';
import { Aquarium } from 'src/app/models/Aquarium';
import { Store } from '@ngrx/store';
import { Species } from 'src/app/models/Species';
import { getAllSpecies } from 'src/app/store/species/species.selector';
import { SpeciesLoadAction } from 'src/app/store/species/species.actions';
import { getAllSnapshots, isLoadingSnapshots } from 'src/app/store/snapshot/snapshot.selector';
import { SnapshotLoadByAquariumAction } from 'src/app/store/snapshot/snapshot.actions';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';

@Component({
  selector: 'snapshot-table-list',
  templateUrl: './snapshot-table-list.component.html',
  styleUrls: ['./snapshot-table-list.component.scss']
})
export class SnapshotTableListComponent {

  public loading$: Observable<Boolean> = this.store.select(isLoadingSnapshots);
  public snapshots$: Observable<AquariumSnapshot[]> = this.store.select(getAllSnapshots);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private selection: SelectionModel<AquariumSnapshot> = new SelectionModel<AquariumSnapshot>(true, []);

  //Columns
  public columns: Array<any> = [
    { name: 'select', visible: true },
    { name: 'id', label: "ID", visible: false },
    { name: 'readableDate', label: 'Date', visible: true },
    { name: 'ammonia', label: 'Ammonia', visible: true },
    { name: 'nitrate', label: 'Nitrate', visible: true },
    { name: 'nitrite', label: 'Nitrite', visible: true },
    { name: 'ph', label: 'PH', visible: true },
    { name: 'temperature', label: 'Temperature (C)', visible: true },
    { name: 'photoId', label: 'Photo ID', visible: false },
  ];

  @Input() aquariumId: number;

  @Input() displayedColumns: any[] = this.columns.filter(col => col.visible).map(col => col.name);
  @Input() searchBox: HTMLInputElement;

  //Event handlers
  @Output() rowClicked = new EventEmitter();
  @Output() rowSelected = new EventEmitter();

  public dataSource: MatTableDataSource<AquariumSnapshot> = new MatTableDataSource<AquariumSnapshot>();
  private componentLifecycle = new Subject();

  constructor(private store: Store<AppState>) {
  }
  ngOnInit() {
    if (this.searchBox)
      this.bindSearchBox();
    this.dataSource.paginator = this.paginator;

    console.log(this.aquariumId);

    var loading = false;
    this.snapshots$.subscribe(snapshots => {
      if (snapshots.length == 0 && !loading) {
        console.log("Weat");
        this.store.dispatch(new SnapshotLoadByAquariumAction(this.aquariumId));
        loading = true;
      }
      else {
        this.dataSource.data = snapshots.map(s => {
          return {
            ...s,
            temperature: s.temperature / 10,
            readableDate: new Date(s.date).toLocaleDateString("en-US") + " " + new Date(s.date).toLocaleTimeString("en-US")
          }
        });
      }
    });
  }
  setAquarium(id: number) {
    this.aquariumId = id;
  }

  updateSort() {
    this.dataSource.sort = this.sort;
  }
  toggleSelection(row) {
    this.selection.toggle(row);
    this.rowSelected.emit([event,row,this.selection.isSelected(row)]);
  }
  getSelectedItems() {
    return this.selection.selected;
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
  rowClickHandler(event: MouseEvent, row: Fish) {
    this.rowClicked.emit([event, row]);
  }
}