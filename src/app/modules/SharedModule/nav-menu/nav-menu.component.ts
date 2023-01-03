import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumSelectionAction, AquariumLoadByIdAction, AquariumUnSelectionAction } from 'src/app/store/aquarium/aquarium.actions';
import { isLoadingAquariums, getSelectedAquarium, getConnectionError } from 'src/app/store/aquarium/aquarium.selector';
import { Aquarium } from 'src/app/models/Aquarium';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AquariumAccount } from 'src/app/modules/SharedDeviceModule/models/AquariumAccount';
import { faSignOutAlt, faSlidersH, faPhotoVideo, faFish, faCogs, faChartLine, faNetworkWired, faBars } from '@fortawesome/free-solid-svg-icons';
import { getAuthenticatedUser } from 'src/app/store/auth/auth.selector';

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
  public user$ = this.store.select(getAuthenticatedUser);

  public faLogout = faSignOutAlt;
  public faSliders = faSlidersH;
  public faPhotos = faPhotoVideo;
  public faFish = faFish;
  public faMaintenance = faCogs;
  public faDashboard = faChartLine;
  public faParameters = faNetworkWired;

  @Input("sidenav") sidenav;
  public faDrawer = faBars;


  constructor(private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private auth: AuthService) { }

  collapse() {
    this.isExpanded = false;
  }

  ngOnInit() {

    this.route.params.subscribe(p => {
      if (p.aqId) {
        this.store.dispatch(new AquariumSelectionAction(p.aqId));
        //this.store.dispatch(new AquariumLoadByIdAction(p.aqId))
      }
    });
    this.connectionError$.pipe(takeUntil(this.componentLifecycle)).subscribe(err => {
      if(err && err.status == 401)
        this.router.navigate(['']);
    });

  }

  openAquariumSelection() {
 
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  clickLogout() {
    this.auth.clearToken(); 
    this.router.navigate(["/"]);
  }
}
