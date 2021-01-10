import { Component, OnInit, Input } from '@angular/core';
import { AccountProfile } from 'src/app/models/AquariumProfile';

@Component({
  selector: 'profile-banner',
  templateUrl: './profile-banner.component.html',
  styleUrls: ['./profile-banner.component.scss']
})
export class ProfileBannerComponent implements OnInit {

  @Input() public profile: AccountProfile;

  constructor() { }

  ngOnInit() {

  }

  public getUsername() {
    return this.profile.account.username;
  }
  public getRole() {
    return this.profile.account.role;
  }
  public getBiography() {
    return this.profile.biography;
  }
}
