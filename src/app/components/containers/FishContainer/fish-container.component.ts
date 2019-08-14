import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { FishLoadByIdAction, FishSelectAction } from 'src/app/store/fish/fish.actions';
import { getSelectedFish } from 'src/app/store/fish/fish.selector';

@Component({
  selector: 'fish-container',
  templateUrl: './fish-container.component.html',
  //styleUrls: ['./nav-menu.component.scss']
})
export class FishContainer {
  public componentLifeCycle = new Subject();
  public fish$ = this.store.select(getSelectedFish);
  public error: string;

  constructor(private route: ActivatedRoute,
    private store: Store<AppState>,
    private title: Title) { }

  ngOnInit() {
    var fishId = this.route.snapshot.params.fishId;
    this.loadFish(fishId);

    this.fish$.pipe(takeUntil(this.componentLifeCycle)).subscribe(fish => {
      if(fish)
        this.title.setTitle("View Fish - " + fish.name);
    }, () => {
      this.title.setTitle("Invalid fish");
      this.error = "Fish was not found";
    });
  }

  loadFish(fishId: number) {
    this.store.dispatch(new FishSelectAction(fishId));
    this.store.dispatch(new FishLoadByIdAction(fishId));

  }
  ngOnDestroy() {
    this.componentLifeCycle.next();
    this.componentLifeCycle.unsubscribe();
  }
}
