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
import { BugReport } from 'src/app/models/BugReport';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AdminService } from 'src/app/services/admin.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faBan } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'bugs-table',
  templateUrl: './bugs-table.component.html',
  styleUrls: ['./bugs-table.component.scss']
})
export class BugsTableComponent {


  public icon_delete:IconDefinition = faBan;


  public loading: boolean;
  public aquarium$: Observable<Aquarium>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private selection: SelectionModel<BugReport> = new SelectionModel<BugReport>(true, []);

  //Columns
  public columns: Array<any> = [
    { name: 'select', visible: true },
    { name: 'id', label: "ID", visible: false },
    { name: 'username', label: 'Username', visible: true },
    { name: 'email', label: 'Email', visible: true },
    { name: 'role', label: 'Role', visible: true },
    { name: 'seniorityDate', label: 'Signup Date', visible: true },
    { name: 'operations', label: 'Operations', visible: true },
  ];

  @Input() aquariumId: number;

  @Input() displayedColumns: any[] = this.columns.filter(col => col.visible).map(col => col.name);
  @Input() searchBox: HTMLInputElement;

  //Event handlers
  @Output() rowClicked = new EventEmitter();

  public dataSource: MatTableDataSource<BugReport> = new MatTableDataSource<BugReport>();
  private componentLifecycle = new Subject();

  constructor(private adminService: AdminService,private authService: AuthService) {
  }
  ngOnInit() {
    if (this.searchBox)
      this.bindSearchBox();

    this.loadUsers();

    this.dataSource.paginator = this.paginator;
  }
  loadUsers() {
    this.loading = true;
    this.adminService.getAllBugReports().subscribe(data => {
      this.dataSource.data = data;
      this.loading = false;
    },err => {
      console.log("Could not load bug reports:",err);
      this.loading = false;
    });
  }

  updateSort() {
    this.dataSource.sort = this.sort;
  }
  toggleSelection(row) {
    this.selection.toggle(row);
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
  rowClickHandler(event: MouseEvent, row: BugReport) {
    if(this.isMyAccount(row)) return;

    this.rowClicked.emit([event, row]);
    this.toggleSelection(row);
  }

  public isMyAccount(row: BugReport) {
    var id = this.authService.getUser().id;
    return row.id == id;
  }
}