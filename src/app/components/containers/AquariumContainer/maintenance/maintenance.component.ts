import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTabGroup, MatTabChangeEvent } from '@angular/material';
import { AquariumService } from 'src/app/services/aquarium.service';
import { Store, select } from '@ngrx/store';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { AppState } from 'src/app/app.state';
import { Aquarium } from 'src/app/models/Aquarium';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

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
    label: "Feeding",
    tabId: "feeding"
  },
  {
    label: "Parameters",
    tabId: "parameters"
  },
  {
    label: "Notifications",
    tabId: "notifications"
  }
  ];
  public aquarium$ = this.store.pipe(select(getSelectedAquarium));

  public aquarium:Aquarium;

  @ViewChild("tabber") tabber: MatTabGroup

  constructor(private store: Store<AppState>,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.aquarium$.pipe(take(1)).subscribe(aquarium => {
      this.aquarium = aquarium;
    });
    this.route.params.pipe(take(1)).subscribe(p => this.setSelectedTab(p.tabId))
  }
  public setSelectedTab(tabId:string) {    
    var idx = this.tabs.map(t => t.tabId).indexOf(tabId);
    this.tabber.selectedIndex = idx;
  }
  updateTabRoute() {
    var tab = this.tabs[this.tabber.selectedIndex];
    this.router.navigate([this.aquarium.id,'maintenance',tab.tabId]);
  }
}
