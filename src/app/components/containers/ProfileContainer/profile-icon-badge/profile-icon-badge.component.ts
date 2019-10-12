import { Component, OnInit, Input } from '@angular/core';
import { AquariumProfile } from 'src/app/models/AquariumProfile';

@Component({
  selector: 'profile-icon-badge',
  templateUrl: './profile-icon-badge.component.html',
  styleUrls: ['./profile-icon-badge.component.scss']
})
export class ProfileIconBadgeComponent implements OnInit {

  @Input() public profile: AquariumProfile;

  constructor() { }

  ngOnInit() {
    console.log(this.profile);
  }

  public getThumbnail():string {
    return this.profile.thumbnail ? this.profile.thumbnail:"assets/avatarDefault.jpg";
  }
}
