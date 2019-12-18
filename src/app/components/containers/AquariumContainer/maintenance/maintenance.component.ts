import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTabGroup, MatTabChangeEvent } from '@angular/material';
import { AquariumService } from 'src/app/services/aquarium.service';
import { Store, select } from '@ngrx/store';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { AppState } from 'src/app/app.state';
import { Aquarium } from 'src/app/models/Aquarium';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'maintenance-page-component',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

  public tabs = [{
    label: "Tasks",
    tabId: "tasks"
  }, {
    label: "Water Changes",
    tabId: "water"
  },
  {
    label: "Nutrients",
    tabId: "dosing"
  },
  {
    label: "Equipment",
    tabId: "equipment"
  }
  ];

  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);


  public aquarium:Aquarium;

  @ViewChild("tabber") tabber: MatTabGroup

  constructor(private store: Store<AppState>,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.setSelectedTab(this.route.snapshot.params.tabId);
  }
  public setSelectedTab(tabId:string) {    
    var idx = this.tabs.map(t => t.tabId).indexOf(tabId);
    this.tabber.selectedIndex = idx;
  }
  updateTabRoute() {
    var tab = this.tabs[this.tabber.selectedIndex];
    var current = this.router.routerState.snapshot.url.split("/");
    current.splice(3,current.length-3);
    //this.router.navigate(current.concat(tab.tabId));
  }
}
