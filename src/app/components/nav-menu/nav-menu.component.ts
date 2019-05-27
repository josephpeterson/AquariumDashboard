import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumListAction, AquariumSelectionAction } from 'src/app/store/aquarium/aquarium.actions';
import { Aquarium } from 'src/app/models/Aquarium';
import { isLoadingAquariums, getAllAquariums, getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { NavMenuComponentData } from './nav-menu-component.data';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isExpanded = false;

  public loading$ = this.data.loading
  public aquariums$ = this.data.aquariums
  public aquarium$ = this.data.aquarium
  public hasValidAquarium = this.data.hasValidAquarium;


  constructor(public data: NavMenuComponentData,
    private route: ActivatedRoute) { }

  collapse() {
    this.isExpanded = false;
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.data.load(p.aqId);
    });
  }

  selectAquarium(val) {
    console.log(val);
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
