import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { takeUntil, take } from 'rxjs/operators';
import { FishLoadByIdAction, FishSelectAction } from 'src/app/store/fish/fish.actions';
import { getSelectedFish, getFishLoadError } from 'src/app/store/fish/fish.selector';
import { faPenFancy } from '@fortawesome/free-solid-svg-icons';
import { Fish } from 'src/app/models/Fish';
import { AquariumService } from 'src/app/services/aquarium.service';

@Component({
  selector: 'profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.scss']

})
export class ProfileContainer {
  public componentLifeCycle = new Subject();
  public targetProfile$ = this.store.select(getSelectedFish);
  public fishLoadError$ = this.store.select(getFishLoadError);
  public error: string;

  public faEdit = faPenFancy;

  private loaded = false;// remove this some how, just allows us to detect deletes

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private title: Title,
    private _aquariumService: AquariumService) { }

  ngOnInit() {
    var fishId = this.route.snapshot.params.profileId;

    this.targetProfile$.pipe(takeUntil(this.componentLifeCycle)).subscribe(fish => {
      if (!this.loaded) {
        this.loadFish(fishId);
      }
      else if (fish) {
        this.title.setTitle("View Fish - " + fish.name);
        console.log(fish);
      }
      else if (this.loaded) {
        this.router.navigateByUrl("/");
      }
    });
  }

  loadFish(fishId: number) {
    this.loaded = true;
    this.store.dispatch(new FishSelectAction(fishId));
    this.store.dispatch(new FishLoadByIdAction(fishId));

    this.fishLoadError$.pipe(take(2)).subscribe(val => {
      if (val)
        this.router.navigateByUrl("/");
    });
  }
  ngOnDestroy() {
    this.componentLifeCycle.next();
    this.componentLifeCycle.unsubscribe();
  }

  getFishThumbnailSource(fish: Fish) {
    var val = "url(" + this._aquariumService.getFishPhotoPermalink(fish.thumbnailPhotoId, "1") + ")";
    return val;
  }
}
