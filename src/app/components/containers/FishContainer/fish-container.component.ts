import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumSelectionAction, AquariumLoadByIdAction, AquariumLoadSuccessAction } from 'src/app/store/aquarium/aquarium.actions';
import { Observable, Subject } from 'rxjs';
import { getSelectedAquarium, isLoadingAquariums } from 'src/app/store/aquarium/aquarium.selector';
import { Aquarium } from 'src/app/models/Aquarium';
import { Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { AquariumService } from 'src/app/services/aquarium.service';
import { Fish } from 'src/app/models/Fish';

@Component({
  selector: 'fish-container',
  templateUrl: './fish-container.component.html',
  //styleUrls: ['./nav-menu.component.scss']
})
export class FishContainer {
  public componentLifeCycle = new Subject();
  public fish$ = new Subject<Fish>();
  public error: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private _aquariumService: AquariumService,
    private title: Title) { }

  ngOnInit() {
    var fishId = this.route.snapshot.params.fishId;
    this.loadFish(fishId);
  }

  loadFish(fishId: number) {
    this._aquariumService.getFishById(fishId).subscribe(fish => {
      this.title.setTitle("View Fish - " + fish.name);
      this.fish$.next(fish);
    }, (err) => {
      this.title.setTitle("Invalid fish");
      this.error = "Fish was not found";
    });
  }
  ngOnDestroy() {
    this.componentLifeCycle.next();
    this.componentLifeCycle.unsubscribe();
    this.fish$.unsubscribe();
  }
}
