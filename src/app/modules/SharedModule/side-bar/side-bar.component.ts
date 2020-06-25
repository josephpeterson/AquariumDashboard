import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { getSelectedThread, getPostLoadError, isLoadingPost, getSelectedBoard } from 'src/app/store/post/post.selector';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { PostSelectThreadAction, PostLoadThreadAction } from 'src/app/store/post/post.actions';
import { Title } from '@angular/platform-browser';
import { PostThread } from 'src/app/models/PostThread';
import { PostBoard } from 'src/app/models/PostBoard';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { Aquarium } from 'src/app/models/Aquarium';
import { faSignOutAlt, faSlidersH, faPhotoVideo, faFish, faCogs, faChartLine, faNetworkWired, faDesktop, faWater, faUser, faBook, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { AquariumService } from 'src/app/services/aquarium.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

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

  constructor(public route: ActivatedRoute,
    public store: Store<AppState>,
    public dialog: MatDialog,
    private titleService: Title,
    private _aquariumService: AquariumService) { }

  ngOnInit() {
   
  }
 
  ngOnDestroy() {
    this.componentLifeCycle.next();
    this.componentLifeCycle.unsubscribe();
  }
}
