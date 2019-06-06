import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTabGroup } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router'
import { AquariumService } from 'src/app/services/aquarium-service/aquarium.service';
import { Store, select } from '@ngrx/store';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { AppState } from 'src/app/app.state';
import { Aquarium } from 'src/app/models/Aquarium';

@Component({
  selector: 'maintenance-page-component',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

  public activeTab: string;
  links = [{
    label: "Tasks",
    route: "tasks"
  }, {
    label: "Feeding",
    route: "feeding"
  },
  {
    label: "Parameters",
    route: "parameters"
  },
  {
    label: "Notifications",
    route: "notifications"
  }
  ];

  public aquarium:Aquarium;

  @ViewChild("navbar") tabber: MatTabGroup

  constructor(private store: Store<AppState>,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    activatedRoute.params.subscribe(p => this.activeTab = p.tab)
  }

  public aquarium$ = this.store.pipe(select(getSelectedAquarium));

  ngOnInit() {
    this.aquarium$.subscribe(aquarium => {
      this.aquarium = aquarium;
    });
  }
  clickTab(event) {
    var linkId = this.tabber.selectedIndex;
    var link = this.links[linkId];
    this.router.navigate([this.aquarium.id,'maintenance',link.route]);
  }
  getSelectedTab() {
    for(var i=0;i<this.links.length;i++) 
      if(this.links[i].route == this.activeTab) return i;
    return 0;
  }
}
