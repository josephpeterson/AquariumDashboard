import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AquariumSelectionAction, AquariumLoadByIdAction } from 'src/app/store/aquarium/aquarium.actions';
import { Observable, Subject } from 'rxjs';
import { getSelectedAquarium, isLoadingAquariums, getAllAquariums } from 'src/app/store/aquarium/aquarium.selector';
import { Aquarium } from 'src/app/models/Aquarium';
import { Title } from '@angular/platform-browser';
import { take, takeUntil } from 'rxjs/operators';
import { faHamburger, faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CreateAquariumModelComponent } from '../../SharedModule/modals/create-aquarium-modal/create-aquarium-modal.component';
import { MatDialog } from '@angular/material/dialog';

/*

This is the new Aquarium container. This container will handle any aquarium
information, as well as apply a filter if we scoped into a specific aquarium id
*/

@Component({
  selector: 'overview-container',
  templateUrl: './overview-container.component.html',
  styleUrls: []
})

export class OverviewContainer {
  public componentLifeCycle = new Subject();

  public aquariums$ = this.store.select(getAllAquariums);

  public faCreate = faPlus;


  constructor(private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private store: Store<AppState>,
    private title: Title) { }

  ngOnInit() {

  }

  load() {
  }


  displayCreateAquariumDialog() {
    var dialog = this.dialog.open(CreateAquariumModelComponent, {
      width: "40%"
    });

    dialog.componentInstance.aquariumSize = 10;
    dialog.componentInstance.aquariumType = "Normal";

    dialog.afterClosed().pipe(take(1)).subscribe(() => {
      //this.data.load(); //Shouldn't have to do this if we just add to the store
    });
    //dialog.error = new ConnectionError(error);
  }
  clickAquarium(aquarium: Aquarium) {
    var url = ["aquarium",aquarium.id];
    this.router.navigate(url);
  }
  ngOnDestroy() {
    this.componentLifeCycle.next();
    this.componentLifeCycle.unsubscribe();
  }
}
