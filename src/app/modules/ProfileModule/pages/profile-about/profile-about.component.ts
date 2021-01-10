import { Component, OnInit } from '@angular/core';
import { getSelectedProfile } from 'src/app/store/profile/profile.selector';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'profile-about',
  templateUrl: './profile-about.component.html',
  styleUrls: ['./profile-about.component.scss']
})
export class ProfileAboutComponent implements OnInit {

  public targetProfile$ = this.store.select(getSelectedProfile);
  
  constructor(public store:Store<AppState>) { }

  ngOnInit() {
  }

}
