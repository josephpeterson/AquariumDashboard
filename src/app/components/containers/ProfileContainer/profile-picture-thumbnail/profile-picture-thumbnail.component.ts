import { Component, OnInit, Input } from '@angular/core';
import { AccountProfile } from 'src/app/models/AquariumProfile';

@Component({
  selector: 'profile-picture-thumbnail',
  templateUrl: './profile-picture-thumbnail.component.html',
  styleUrls: ['./profile-picture-thumbnail.component.scss']
})
export class ProfilePictureThumbnailComponent implements OnInit {

  @Input() public profile: AccountProfile;

  constructor() { }

  ngOnInit() {
  }

  public getThumbnail():string {
    return this.profile.thumbnail ? this.profile.thumbnail:"assets/avatarDefault.jpg";
  }
}
