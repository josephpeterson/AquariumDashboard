import { Component, OnInit } from '@angular/core';
import { getSelectedProfile } from 'src/app/store/profile/profile.selector';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'profile-manage',
  templateUrl: './profile-manage.component.html',
  styleUrls: ['./profile-manage.component.scss']
})
export class ProfileManageComponent implements OnInit {

  public targetProfile$ = this.store.select(getSelectedProfile);
  
  constructor(public store:Store<AppState>) { }

  ngOnInit() {
  }

}
