import { Component, OnInit, Input } from '@angular/core';
import { AquariumProfile } from 'src/app/models/AquariumProfile';

@Component({
  selector: 'profile-picture-thumbnail',
  templateUrl: './profile-picture-thumbnail.component.html',
  styleUrls: ['./profile-picture-thumbnail.component.scss']
})
export class ProfilePictureThumbnailComponent implements OnInit {

  @Input() public profile: AquariumProfile;

  constructor() { }

  ngOnInit() {
  }

  public getThumbnail():string {
    return this.profile.thumbnail ? this.profile.thumbnail:"assets/avatarDefault.jpg";
  }
}
