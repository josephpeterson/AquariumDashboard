import { Component, OnInit } from '@angular/core';
import { getSelectedProfile } from 'src/app/store/profile/profile.selector';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'profile-aquariums',
  templateUrl: './profile-aquariums.component.html',
  styleUrls: ['./profile-aquariums.component.scss']
})
export class ProfileAquariumsComponent implements OnInit {

  public targetProfile$ = this.store.select(getSelectedProfile);
  
  constructor(public store:Store<AppState>) { }

  ngOnInit() {
  }

}
