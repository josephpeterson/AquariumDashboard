import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router'
import { AquariumService } from 'src/app/services/aquarium-service/aquarium.service';
import { Store, select } from '@ngrx/store';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'maintenance-page-component',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})


export class MaintenanceComponent implements OnInit {
 
  constructor(private store: Store<AppState>,
    private aquariumService: AquariumService,private route:ActivatedRoute,
    public dialog: MatDialog,
  ) {}
  
  public aquarium = this.store.pipe(select(getSelectedAquarium));

  ngOnInit() {
    this.aquarium.subscribe(aquarium => {
      console.log(aquarium);
    });
  }
}

