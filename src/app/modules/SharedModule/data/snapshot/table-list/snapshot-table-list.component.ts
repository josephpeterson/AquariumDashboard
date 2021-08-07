import { Fish } from 'src/app/models/Fish';
import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
import * as moment from 'moment';
import { AquariumService } from 'src/app/services/aquarium.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'snapshot-table-list',
  templateUrl: './snapshot-table-list.component.html',
  styleUrls: ['./snapshot-table-list.component.scss']
})
export class SnapshotTableListComponent implements OnInit {

  public loading$: Observable<Boolean> = this.store.select(isLoadingSnapshots);
  public snapshots$: Observable<AquariumSnapshot[]> = this.store.select(getAllSnapshots);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private selection: SelectionModel<AquariumSnapshot> = new SelectionModel<AquariumSnapshot>(true, []);

  //Columns
  public columns: Array<any> = [
    { name: 'select', visible: true },
    { name: 'imageSrc', visible: true },
    { name: 'id', label: "ID", visible: false },
    { name: 'readableDate', label: 'Date', visible: true },
    { name: 'ammonia', label: 'Ammonia', visible: true },
    { name: 'nitrate', label: 'Nitrate', visible: true },
    { name: 'nitrite', label: 'Nitrite', visible: true },
    { name: 'ph', label: 'PH', visible: true },
    { name: 'temperature', label: 'Temperature (C)', visible: true },
    { name: 'photoId', label: 'Photo ID', visible: false },
    { name: 'manualEntry', label: 'Manual Test', visible: true },
  ];

  @Input() aquariumId: number;

  @Input() displayedColumns: any[] = this.columns.filter(col => col.visible).map(col => col.name);
  @Input() searchBox: HTMLInputElement;
  //Event handlers
  @Output() rowClicked = new EventEmitter();
  @Output() rowSelected = new EventEmitter();

  public dataSource: MatTableDataSource<AquariumSnapshot> = new MatTableDataSource<AquariumSnapshot>();
  private componentLifeCycle$ = new Subject();

  constructor(private store: Store<AppState>, private _aquariumService: AquariumService,
    private notifier: NotificationService) {
  }
  ngOnInit() {
    if (this.searchBox)
      this.bindSearchBox();
    this.dataSource.paginator = this.paginator;

    var loading = false;
    this.snapshots$.pipe(takeUntil(this.componentLifeCycle$)).subscribe(snapshots => {
      if (!snapshots.length && !loading) {
        this.setAquarium(this.aquariumId);
        loading = true;
        return;
      }
      this.dataSource.data = snapshots.map(s => {
        return {
          ...s,
          temperature: s.temperature,
          readableDate: moment(s.date).local().calendar(),
          //imageSrc: 'url(' + this._aquariumService.getPhotoPermalink(s.photoId) + ')'
        }
      });
    });
  }
  ngOnDestory() {
    this.componentLifeCycle$.next();
    this.componentLifeCycle$.unsubscribe();
  }

  setAquarium(id: number) {
    this.aquariumId = id;
    this.store.dispatch(new SnapshotLoadByAquariumAction(id, 0, 10));
  }

  updateSort() {
    this.dataSource.sort = this.sort;
  }
  toggleSelection(row) {
    this.selection.toggle(row);
    this.rowSelected.emit([event, row, this.selection.isSelected(row)]);
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


  public clickDeleteSelectedSnapshots() {
    var snapshotIds = this.getSelectedItems().map(s => s.id);

    this._aquariumService.deleteSnapshots(snapshotIds).subscribe(res => {
      this.notifier.notify("success", `${snapshotIds.length} snapshots deleted`);
      var newList = this.dataSource.data.filter(s => snapshotIds.indexOf(s.id) == -1);
      this.dataSource.data = newList;
    }, err => {
      this.notifier.notify("error", "Could not delete selected snapshots");
    });
  }
}