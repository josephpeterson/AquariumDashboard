import { Component, OnInit } from '@angular/core';
import { getSelectedProfile } from 'src/app/store/profile/profile.selector';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'profile-fish',
  templateUrl: './profile-fish.component.html',
  styleUrls: ['./profile-fish.component.scss']
})
export class ProfileFishComponent implements OnInit {

  public targetProfile$ = this.store.select(getSelectedProfile);
  
  constructor(public store:Store<AppState>) { }

  ngOnInit() {
  }

}
