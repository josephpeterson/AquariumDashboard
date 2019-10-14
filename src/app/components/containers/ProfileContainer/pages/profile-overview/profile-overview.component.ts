import { Component, OnInit } from '@angular/core';
import { getSelectedProfile } from 'src/app/store/profile/profile.selector';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.scss']
})
export class ProfileOverviewComponent implements OnInit {

  public targetProfile$ = this.store.select(getSelectedProfile);
  
  constructor(public store:Store<AppState>) { }

  ngOnInit() {
  }

}
