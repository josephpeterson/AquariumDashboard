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
import { getSelectedAquarium, getAllAquariums } from 'src/app/store/aquarium/aquarium.selector';
import { Aquarium } from 'src/app/models/Aquarium';
import { faSignOutAlt, faSlidersH, faPhotoVideo, faFish, faCogs, faChartLine, faNetworkWired, faDesktop, faWater } from '@fortawesome/free-solid-svg-icons';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AquariumListAction } from 'src/app/store/aquarium/aquarium.actions';

@Component({
  selector: 'aquarium-nav-bar',
  templateUrl: './aquarium-nav-bar.component.html',
  styleUrls: ['./aquarium-nav-bar.component.scss']
})
export class AquariumNavBarComponent implements OnInit {

  public faLogout = faSignOutAlt;
  public faSliders = faSlidersH;
  public faPhotos = faPhotoVideo;
  public faFish = faFish;
  public faMaintenance = faCogs;
  public faDashboard = faChartLine;
  public faDevice = faDesktop;
  public faParameters = faWater;
  
  public componentLifeCycle = new Subject();
  public selectedAquarium$ = this.store.select(getSelectedAquarium);
  public selectedBoard$ = this.store.select(getSelectedBoard);
  public threadLoadError$ = this.store.select(getPostLoadError);
  public threadLoading$ = this.store.select(isLoadingPost);
  public aquariums$ = this.store.select(getAllAquariums);

  public selectedAquarium: Aquarium;
  public selectedBoard: PostBoard;

  constructor(public route: ActivatedRoute,
    private _aquariumService: AquariumService,
    public store: Store<AppState>,
    public dialog: MatDialog,
    private titleService: Title) { }

  ngOnInit() {
    this.store.dispatch(new AquariumListAction());
    this.selectedAquarium$.pipe(takeUntil(this.componentLifeCycle)).subscribe(aq => {
      this.selectedAquarium = aq;
      this.updateTitle();
    });
    this.selectedBoard$.pipe(takeUntil(this.componentLifeCycle)).subscribe(board => {
      this.selectedBoard = board;
      this.updateTitle();
    });
  }
  ngOnDestroy() {
    this.componentLifeCycle.next();
    this.componentLifeCycle.unsubscribe();
  }
  private updateTitle() {
    if (this.selectedAquarium)
      this.titleService.setTitle(this.selectedAquarium.name);
  }
}
