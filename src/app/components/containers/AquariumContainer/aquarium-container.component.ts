import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumSelectionAction, AquariumLoadByIdAction } from 'src/app/store/aquarium/aquarium.actions';
import { Observable } from 'rxjs';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
import { Aquarium } from 'src/app/models/Aquarium';

@Component({
  selector: 'aquarium-container',
  template: '<div class="container"><router-outlet *ngIf="aquarium$ | async"></router-outlet></div>',
  //styleUrls: ['./nav-menu.component.scss']
})
export class AquariumContainer {
  public aquarium$: Observable<Aquarium> = this.store.select(getSelectedAquarium);

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.load(p.aqId);
    });
  }

  load(aqId: number) {
    this.store.dispatch(new AquariumSelectionAction(aqId));
    this.store.dispatch(new AquariumLoadByIdAction(aqId));
  }

  selectAquarium(val) {
    var url = this.router.url;
    var path = url.split("/").splice(2);
    this.router.navigate([val,...path]);
  }
}
