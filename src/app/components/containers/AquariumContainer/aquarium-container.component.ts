import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumSelectionAction, AquariumLoadByIdAction } from 'src/app/store/aquarium/aquarium.actions';
import { Observable, Subject } from 'rxjs';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { Aquarium } from 'src/app/models/Aquarium';
import { Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'aquarium-container',
  template: '<nav-menu></nav-menu><div class="container"><router-outlet *ngIf="aquarium$ | async"></router-outlet></div>',
  //styleUrls: ['./nav-menu.component.scss']
})
export class AquariumContainer {
  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);
  public componentLifeCycle = new Subject();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private title: Title) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.load(p.aqId);
    });
    this.aquarium$.pipe(takeUntil(this.componentLifeCycle)).subscribe(aq => {
      if(aq) this.title.setTitle(aq.name);
    });
  }

  load(aqId: number) {
    this.store.dispatch(new AquariumSelectionAction(aqId));
    this.store.dispatch(new AquariumLoadByIdAction(aqId));
  }

  selectAquarium(val) {
    var url = this.router.url;
    var path = url.split("/").splice(2);
    this.router.navigate([val, ...path]);
  }

  ngOnDestroy() {
    this.componentLifeCycle.next();
    this.componentLifeCycle.unsubscribe();
  }
}
