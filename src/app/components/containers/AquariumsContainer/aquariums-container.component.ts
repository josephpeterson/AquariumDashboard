import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumSelectionAction, AquariumLoadByIdAction } from 'src/app/store/aquarium/aquarium.actions';
import { Observable, Subject } from 'rxjs';
import { getSelectedAquarium, isLoadingAquariums, getAllAquariums } from 'src/app/store/aquarium/aquarium.selector';
import { Aquarium } from 'src/app/models/Aquarium';
import { Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { faHamburger, faBars } from '@fortawesome/free-solid-svg-icons';

/*

This is the new Aquarium container. This container will handle any aquarium
information, as well as apply a filter if we scoped into a specific aquarium id
*/

@Component({
  selector: 'aquariums-container',
  templateUrl: './aquariums-container.component.html',
  //styleUrls: ['./nav-menu.component.scss']
})

export class AquariumsContainer {
  public componentLifeCycle = new Subject();

  public aquariums$ = this.store.select(getAllAquariums);

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private title: Title) { }

  ngOnInit() {

  }

  load() {
  }

  ngOnDestroy() {
    this.componentLifeCycle.next();
    this.componentLifeCycle.unsubscribe();
  }
}
