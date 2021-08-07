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
import { AquariumFeeding } from 'src/app/models/AquariumFeeding';
import { getAllFish, getFishById } from 'src/app/store/fish/fish.selector';
import { FishLoadByIdAction } from 'src/app/store/fish/fish.actions';

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
    { name: 'id', label: "Feeding ID", visible: true },
    { name: 'foodBrand', label: 'Food Brand', visible: true },
    { name: 'foodProduct', label: 'Product', visible: true },
    { name: 'readableDate', label: 'Feed Date', visible: true },
    { name: 'fishName', label: 'Fish', visible: true },
    { name: 'fishId', label: 'Fish ID', visible: false },
    { name: 'aquariumId', label: 'Aquarium ID', visible: false },
  ];

  @Input() fish: Fish;
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

    if (this.fish) this.setFish(this.fish);
    else if (this.fishId) this.setFishId(this.fishId);
    else if (this.aquariumId) this.setAquariumId(this.aquariumId);
    else this.setAllFeedings();

    //this.store.dispatch(new SpeciesLoadAction());

    this.dataSource.paginator = this.paginator;
  }
  setFish(fish: Fish) {
    this.fish = fish;
    var data = fish.feedings.map(feed => {
      var item = new FeedingTableItem(feed);
      item.readableDate = new Date(item.date).toDateString();
      item.fishName = fish.name;
      return item;
    });
    this.dataSource.data = data;
  }
  setFishId(fishId: number) {
    this.store.select(getFishById(fishId)).pipe(take(2)).subscribe(fish => {
      if (!fish) this.store.dispatch(new FishLoadByIdAction(fishId));
      else this.setFish(fish);
    });
  }
  setAquariumId(id: number) {
    this.aquariumId = id;
    this.aquarium$ = this.store.select(getAquariumById, this.aquariumId);
    this.store.dispatch(new AquariumLoadByIdAction(id)); //todo remove this? cache possibly
    this.aquarium$.pipe(takeUntil(this.componentLifecycle)).subscribe(aq => {
      if (!aq.fish) return
      var feedingList = aq.feedings;
      this.species$.pipe(take(2)).subscribe(species => {
        var data = feedingList.map(feed => {
          var item = new FeedingTableItem(feed);
          item.readableDate = new Date(item.date).toDateString();

          var fish = aq.fish.filter(f => f.id == feed.fishId)[0];
          item.fishName = fish.name;
          return item;
        })
        this.dataSource.data = data;
      });
    });
  }
  setAllFeedings() {

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
  public readableDate: string;

  constructor(source: AquariumFeeding) {
    super();
    Object.assign(this, source);
  }
}