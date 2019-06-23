import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorMessageModalComponent } from '../modals/error-message-modal/error-message-modal.component';
import { ConnectionError } from 'src/app/models/ConnectionError';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CreateAquariumModelComponent } from '../modals/create-aquarium-modal/create-aquarium-modal.component';
import { take } from 'rxjs/operators';
import { Species } from 'src/app/models/Species';
import { Router } from '@angular/router';
import { AquariumListAction, AquariumSelectionAction, AquariumUnSelectionAction } from 'src/app/store/aquarium/aquarium.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getAllAquariums, isLoadingAquariums, getConnectionError } from 'src/app/store/aquarium/aquarium.selector';

@Component({
  selector: 'master-dashboard-component',
  templateUrl: './master-dashboard.component.html',
  styleUrls: ['./master-dashboard.component.scss']
})
export class MasterDashboardComponent implements OnInit {
  constructor(public dialog: MatDialog, public router: Router, private store: Store<AppState>) { }

  public aquariums$ = this.store.select(getAllAquariums);
  public loading$ = this.store.select(isLoadingAquariums);
  public connectionError$ = this.store.select(getConnectionError);

  //Font-Awesome Icons
  faCreate = faPlus;

  ngOnInit() {
    //Unselect our tank
    this.store.dispatch(new AquariumUnSelectionAction());
    this.loadAquariums();

    //Bind error to dialog
    this.connectionError$.pipe(take(2)).subscribe(error => {
      console.log(error);
      if(error)
        this.displayErrorDialog(error);
    });
  }
  displayErrorDialog(error) {
    var dialog = this.dialog.open(ErrorMessageModalComponent, {
    }).componentInstance;
    dialog.error = new ConnectionError(error);
  }

  loadAquariums() {
    this.store.dispatch(new AquariumListAction());
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

  clickSpecies(species: Species) {
    var url = ["species", species.id];
    this.router.navigate(url);
  }
}

