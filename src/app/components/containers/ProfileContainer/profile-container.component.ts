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
import { AquariumProfile } from 'src/app/models/AquariumProfile';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.scss']

})
export class ProfileContainer {
  public componentLifeCycle = new Subject();
  public targetProfile$  = new Subject();
  public fishLoadError$ = this.store.select(getFishLoadError);
  public error: string;

  public faEdit = faPenFancy;
  public loaded:boolean = false;
  loading: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private title: Title,
    private _aquariumService: AquariumService){}

  ngOnInit() {
    var profileId = this.route.snapshot.params.profileId;
    
    this.loadProfile(profileId);
  }
  loadProfile(profileId: any) {
    this.loading = true;
    this._aquariumService.getAquariumProfile(profileId).pipe(take(1)).subscribe(profile => {
      this.loading = false;
      this.targetProfile$.next(profile);
    },(err:HttpErrorResponse) => {
      this.loading = false;
      this.error = err.message;
      this.targetProfile$.next();
    });
  }
  
  ngOnDestroy() {
    this.componentLifeCycle.next();
    this.componentLifeCycle.unsubscribe();
  }
}
