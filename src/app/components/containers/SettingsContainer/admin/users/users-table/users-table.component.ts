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
import { AquariumAccount } from 'src/app/models/AquariumAccount';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {

  public loading: boolean;
  public aquarium$: Observable<Aquarium>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private selection: SelectionModel<AquariumAccount> = new SelectionModel<AquariumAccount>(true, []);

  //Columns
  public columns: Array<any> = [
    { name: 'select', visible: true },
    { name: 'id', label: "ID", visible: false },
    { name: 'username', label: 'Username', visible: true },
    { name: 'email', label: 'Email', visible: true },
    { name: 'seniorityDate', label: 'Signup Date', visible: true },
  ];

  @Input() aquariumId: number;

  @Input() displayedColumns: any[] = this.columns.filter(col => col.visible).map(col => col.name);
  @Input() searchBox: HTMLInputElement;

  //Event handlers
  @Output() rowClicked = new EventEmitter();

  public dataSource: MatTableDataSource<AquariumAccount> = new MatTableDataSource<AquariumAccount>();
  private componentLifecycle = new Subject();

  constructor(private adminService: AdminService) {
  }
  ngOnInit() {
    if (this.searchBox)
      this.bindSearchBox();

    this.loadUsers();

    this.dataSource.paginator = this.paginator;
  }
  loadUsers() {
    this.loading = true;
    this.adminService.getAllAquariumAccounts().subscribe(data => {
      this.dataSource.data = data;
      this.loading = false;
    },err => {
      console.log("Could not load users:",err);
      this.loading = false;
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