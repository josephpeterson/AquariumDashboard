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

@Component({
  selector: 'fish-table-list',
  templateUrl: './fish-table-list.component.html',
  styleUrls: ['./fish-table-list.component.scss']
})
export class FishTableListComponent {

  public loading$: Observable<Boolean> = this.store.select(isLoadingAquariums);
  public aquarium$: Observable<Aquarium>;
  public species$: Observable<Species[]> = this.store.select(getAllSpecies);

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  private selection: SelectionModel<Fish> = new SelectionModel<FishTableItem>(true, []);

  //Columns
  public columns: Array<any> = [
    { name: 'select', visible: true },
    { name: 'id', label: "ID", visible: true },
    { name: 'name', label: 'Full Name', visible: true },
    { name: 'description', label: 'Description', visible: true },
    { name: 'date', label: 'Adoption Date', visible: true },
    { name: 'speciesId', label: 'Species Id', visible: true },
    { name: 'aquariumId', label: 'Assigned Aquarium', visible: false },
    { name: 'speciesName', label: 'Species', visible: false },
    { name: 'readableDate', label: 'Adoption Date', visible: false },
  ];

  @Input() aquariumId: number;

  @Input() displayedColumns: any[] = this.columns.filter(col => col.visible).map(col => col.name);
  @Input() searchBox: HTMLInputElement;

  //Event handlers
  @Output() rowClicked = new EventEmitter();

  public dataSource: MatTableDataSource<FishTableItem> = new MatTableDataSource<FishTableItem>();
  private componentLifecycle = new Subject();

  constructor(private store: Store<AppState>) {
  }
  ngOnInit() {
    if (this.searchBox)
      this.bindSearchBox();

    this.store.dispatch(new SpeciesLoadAction());
    this.setAquarium(this.aquariumId);

    this.dataSource.paginator = this.paginator;
  }
  setAquarium(id: number) {
    this.aquariumId = id;
    this.aquarium$ = this.store.select(getAquariumById, this.aquariumId);
    this.store.dispatch(new AquariumLoadByIdAction(id)); //todo remove this? cache possibly
    this.aquarium$.pipe(takeUntil(this.componentLifecycle)).subscribe(aq => {
      if (!aq.fish) return
      var fishList = aq.fish;
      this.species$.pipe(take(2)).subscribe(species => {
        var data = fishList.map(fish => {
          var item = new FishTableItem(fish);
          item.readableDate = new Date(item.date).toDateString();
          var specie = species.filter(s => s.id == item.speciesId);
          if (specie.length)
            item.speciesName = specie[0].name;
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
class FishTableItem extends Fish {
  public speciesName: string;
  public readableDate: string;

  constructor(source: Fish) {
    super();
    Object.assign(this, source);
  }
}