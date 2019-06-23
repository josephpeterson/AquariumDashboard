import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumSelectionAction, AquariumLoadByIdAction } from 'src/app/store/aquarium/aquarium.actions';
import { isLoadingAquariums, getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { Aquarium } from 'src/app/models/Aquarium';
import { MatDialog } from '@angular/material';
import { ManageFishModalComponent } from '../modals/manage-fish-modal/manage-fish-modal.component';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isExpanded = false;

  public loading$ = this.store.select(isLoadingAquariums);
  public aquarium$ = this.store.select(getSelectedAquarium);


  constructor(private store: Store<AppState>,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }

  collapse() {
    this.isExpanded = false;
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p.aqId) {
        this.store.dispatch(new AquariumSelectionAction(p.aqId));
        this.store.dispatch(new AquariumLoadByIdAction(p.aqId));
      }
    });
  }

  openAquariumSelection() {
    var inst  = this.dialog.open(ManageFishModalComponent,{
      height: "70%",
      width: "60%",
    });
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
