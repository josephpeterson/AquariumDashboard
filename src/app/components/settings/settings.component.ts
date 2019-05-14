import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { getSelectedAquarium, getError } from 'src/app/store/aquarium/aquarium.selector';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumUpdateAction } from 'src/app/store/aquarium/aquarium.actions';
import { Aquarium } from 'src/app/models/Aquarium';
import { Observable } from 'rxjs';

@Component({
  selector: 'settings-page-component',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})


export class SettingsComponent implements OnInit {
  
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  
  @Input("aquariumName") aquariumName: string
  @Input("aquariumSize") aquariumSize: number

  constructor(private store: Store<AppState>,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.store.select(getSelectedAquarium).subscribe(a => {
      this.aquarium = a;
    });
  }

  public aquarium: Aquarium

  error$: Observable<string> = this.store.pipe(select(getError));

  saveChanges() {
    
    var aquarium:Aquarium = new Aquarium();
    Object.apply(aquarium,{
      id: this.aquarium.id,
      date: this.date.value,
      gallons: this.aquariumSize,
      name: this.aquariumName
    });
    this.store.dispatch(new AquariumUpdateAction(aquarium));
  }

  aquariumExport() {

  }
  aquariumDelete() {
    
  }
  snapshotManage() {

  }
  snapshotDeleteAll() {

  }
}

