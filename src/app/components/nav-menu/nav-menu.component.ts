import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumSelectionAction, AquariumLoadByIdAction } from 'src/app/store/aquarium/aquarium.actions';
import { isLoadingAquariums, getSelectedAquarium, getConnectionError } from 'src/app/store/aquarium/aquarium.selector';
import { Aquarium } from 'src/app/models/Aquarium';
import { MatDialog } from '@angular/material';
import { SelectAquariumModelComponent } from '../modals/select-aquarium-modal/select-aquarium-modal.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isExpanded = false;

  public loading$ = this.store.select(isLoadingAquariums);
  public aquarium$ = this.store.select(getSelectedAquarium);
  public connectionError$ = this.store.select(getConnectionError);

  private componentLifecycle = new Subject();


  constructor(private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { }

  collapse() {
    this.isExpanded = false;
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p.aqId) {
        this.store.dispatch(new AquariumSelectionAction(p.aqId));
        this.store.dispatch(new AquariumLoadByIdAction(p.aqId))
      }
    });
    this.connectionError$.pipe(takeUntil(this.componentLifecycle)).subscribe(err => {
      if(err)
        this.router.navigate(['']);
    });
  }

  openAquariumSelection() {
  this.dialog.open(SelectAquariumModelComponent, {
      height: "70%",
      width: "60%",
    }).afterClosed().subscribe(aq => {
      if (aq){
        this.router.navigate([aq.id]);
      }
    });
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
