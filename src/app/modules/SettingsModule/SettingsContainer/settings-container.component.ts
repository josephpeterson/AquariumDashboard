import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getAllAquariums, isLoadingAquariums, getConnectionError } from 'src/app/store/aquarium/aquarium.selector';
import { AuthService } from 'src/app/services/auth.service';
import { Subject } from 'rxjs';
import { AquariumAccount } from 'src/app/models/AquariumAccount';

@Component({
  selector: 'settings-container-component',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.scss']
})
export class SettingsContainer implements OnInit {

  public componentLifeCycle = new Subject();
  public error: string;
  public user: AquariumAccount;


  logged: boolean;
  constructor(public dialog: MatDialog, public router: Router, private store: Store<AppState>,private auth:AuthService) { }

  public aquariums$ = this.store.select(getAllAquariums);
  public loading$ = this.store.select(isLoadingAquariums);
  public connectionError$ = this.store.select(getConnectionError);

  //Font-Awesome Icons
  faCreate = faPlus;

  ngOnInit() {
    this.user = this.auth.getUser();
  }
}

