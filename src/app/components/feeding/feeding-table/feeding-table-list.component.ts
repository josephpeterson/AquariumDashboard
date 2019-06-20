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
import { getAllSpecies, isLoadingSpecies } from 'src/app/store/species/species.selector';
import { SpeciesLoadAction } from 'src/app/store/species/species.actions';
import { AquariumFeeding } from 'src/app/models/AquariumFeeding';

@Component({
  selector: 'feeding-table-list',
  templateUrl: './feeding-table-list.component.html',
  styleUrls: ['./feeding-table-list.component.scss']
})
export class FeedingTableListComponent {

  public loading$: Observable<Boolean> = this.store.select(isLoadingAquariums);
  public aquarium$: Observable<Aquarium>;
  public species$: Observable<Species[]> = this.store.select(getAllSpecies);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private selection: SelectionModel<FeedingTableItem> = new SelectionModel<FeedingTableItem>(true, []);

  //Columns
  public columns: Array<any> = [
    { name: 'select', visible: true },
    { name: 'foodBrand', label: 'Food Brand', visible: true },
    { name: 'foodProduct', label: 'Product', visible: true },
    { name: 'readableDate', label: 'Feed Date', visible: true },
    { name: 'fishName', label: 'Fish', visible: true },
    { name: 'speciesName', label: 'Species', visible: true },

    { name: 'id', label: "Feeding ID", visible: false },
    { name: 'fishId', label: 'Fish ID', visible: false },
    { name: 'aquariumId', label: 'Aquarium ID', visible: false },
  ];

  @Input() aquariumId: number;
  @Input() fishId: number;

  @Input() displayedColumns: any[] = this.columns.filter(col => col.visible).map(col => col.name);
  @Input() searchBox: HTMLInputElement;

  //Event handlers
  @Output() rowClicked = new EventEmitter();

  public dataSource: MatTableDataSource<FeedingTableItem> = new MatTableDataSource<FeedingTableItem>();
  private componentLifecycle = new Subject();

  constructor(private store: Store<AppState>) {
  }
  ngOnInit() {
    if (this.searchBox)
      this.bindSearchBox();

    this.load();
    this.setAquarium(this.aquariumId);

    this.dataSource.paginator = this.paginator;
  }
  load() {
    this.store.select(isLoadingSpecies).pipe(take(1)).subscribe(val => {
      if (!val) this.store.dispatch(new SpeciesLoadAction());
    });
  }
  setAquarium(id: number) {
    this.aquariumId = id;
    this.aquarium$ = this.store.select(getAquariumById, this.aquariumId);
    this.store.dispatch(new AquariumLoadByIdAction(id)); //todo remove this? cache possibly
    this.aquarium$.pipe(takeUntil(this.componentLifecycle)).subscribe(aq => {
      if (!aq.fish) return
      var feedingList = aq.feedings.filter(feed => feed.fishId == this.fishId || this.fishId == null);
      this.species$.pipe(take(2)).subscribe(species => {
        if (species.length == 0) return

        var data = feedingList.map(feed => {
          var item = new FeedingTableItem(feed);
          item.readableDate = new Date(item.date).toDateString();

          var fish = aq.fish.filter(f => f.id == feed.fishId)[0];
          item.fishName = fish.name;
          item.speciesName = species.filter(s => s.id == fish.speciesId)[0].name;
          return item;
        })
        this.dataSource.data = data;
      });
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
  rowClickHandler(event: MouseEvent, row: Fish) {
    this.rowClicked.emit([event, row]);
  }
}
class FeedingTableItem extends AquariumFeeding {
  public fishName: string;
  public speciesName: string;
  public readableDate: string;

  constructor(source: AquariumFeeding) {
    super();
    Object.assign(this, source);
  }
}