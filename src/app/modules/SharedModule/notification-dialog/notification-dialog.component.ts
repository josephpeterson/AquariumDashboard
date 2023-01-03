import { Component, Inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Aquarium } from 'src/app/models/Aquarium';
import { faSignOutAlt, faSlidersH, faPhotoVideo, faFish, faCogs, faChartLine, faDesktop, faWater, faUser, faBook, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AuthService } from 'src/app/services/auth.service';
import { AquariumAccount } from 'src/app/modules/SharedDeviceModule/models/AquariumAccount';
import { getAuthenticatedUser } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent implements OnInit {

  public faLogout = faSignOutAlt;
  public faSliders = faSlidersH;
  public faPhotos = faPhotoVideo;
  public faFish = faFish;
  public faMaintenance = faCogs;
  public faDashboard = faChartLine;
  public faDevice = faDesktop;
  public faParameters = faWater;

  public icon_Aquariums = faWater;
  public icon_Profile = faUser;
  public icon_Journal = faBook;
  public icon_Calendar = faCalendar;
  public icon_Photos = faPhotoVideo;
  public icon_Species = faWater;
  
  public componentLifeCycle = new Subject();


  public aquariums: Aquarium[];
  public user: AquariumAccount;

  public user$ = this.store.select(getAuthenticatedUser);



  constructor(public route: ActivatedRoute,
    public store: Store<AppState>,
    public dialog: MatDialog,
    private titleService: Title,
    private _aquariumService: AquariumService,
    private auth: AuthService,
    public sbRef: MatSnackBarRef<NotificationDialogComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
 
  }
 
  ngOnDestroy() {
    this.componentLifeCycle.next();
    this.componentLifeCycle.unsubscribe();
  }
}
