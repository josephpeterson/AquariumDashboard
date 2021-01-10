import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Subject, Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { takeUntil, take } from 'rxjs/operators';
import { FishLoadByIdAction, FishSelectAction } from 'src/app/store/fish/fish.actions';
import { getSelectedFish, getFishLoadError } from 'src/app/store/fish/fish.selector';
import { faPenFancy } from '@fortawesome/free-solid-svg-icons';
import { Fish } from 'src/app/models/Fish';
import { AquariumService } from 'src/app/services/aquarium.service';
import { AccountProfile } from 'src/app/models/AquariumProfile';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileSelectAction, ProfileLoadAction } from 'src/app/store/profile/profile.actions';
import { getProfileLoadError, getSelectedProfile, isLoadingProfile } from 'src/app/store/profile/profile.selector';

@Component({
  selector: 'profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.scss']

})
export class ProfileContainer {
  public componentLifeCycle = new Subject();
  public targetProfile$ = this.store.select(getSelectedProfile);
  public profileLoadError$ = this.store.select(getProfileLoadError);
  public profileLoading$ = this.store.select(isLoadingProfile);
  public error: string;

  public faEdit = faPenFancy;
  public loaded: boolean = false;
  loading: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private title: Title,
    private _aquariumService: AquariumService) { }

  ngOnInit() {

    this.route.params.pipe(takeUntil(this.componentLifeCycle)).subscribe(params => {
      var profileId = params.profileId;
      this.loadProfile(profileId);
    });
  }
  loadProfile(profileId: any) {
    this.store.dispatch(new ProfileSelectAction(profileId));
    this.store.dispatch(new ProfileLoadAction(profileId));
  }

  ngOnDestroy() {
    this.componentLifeCycle.next();
    this.componentLifeCycle.unsubscribe();
  }
}
