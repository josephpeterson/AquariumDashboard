import { Component, OnInit, Input } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumLoadByIdAction } from 'src/app/store/aquarium/aquarium.actions';
import { getAquariumById, getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { takeUntil } from 'rxjs/operators';
import { Aquarium } from 'src/app/models/Aquarium';
import { Fish } from 'src/app/models/Fish';
import { Subject } from 'rxjs';

@Component({
  selector: 'manage-fish-modal',
  templateUrl: './manage-fish-modal.component.html',
  styleUrls: ['./manage-fish-modal.component.scss']
})
export class ManageFishModalComponent implements OnInit {

  @Input() aquariumId: number;

  public selectedFishId;
  public addingFish;

  public aquarium$ = this.store.select(getSelectedAquarium);

  public componentLifecycle = new Subject();

  constructor(private store: Store<AppState>) {
  }
  ngOnInit() {

    this.loadAquarium(this.aquariumId);
    return;
    this.aquarium$.pipe(takeUntil(this.componentLifecycle)).subscribe(aq => {
      if (aq)
        this.applyAquarium(aq);
    });
  }

  loadAquarium(id) {
    return;
    this.store.dispatch(new AquariumLoadByIdAction(id));
    this.aquarium$ = this.store.select(getAquariumById, id);
    this.aquarium$.pipe(takeUntil(this.componentLifecycle)).subscribe(aq => {
      if (aq)
        this.applyAquarium(aq);
    });
  }
  applyAquarium(aquarium: Aquarium) {

  }
  clickFish(fish: Fish) {
    this.selectedFishId = fish.id;
  }
  clickAddFish() {
    this.selectedFishId = undefined;
    this.addingFish = true;
  }
  clickBack() {
    this.selectedFishId = undefined;
    this.addingFish = false;
  }
}