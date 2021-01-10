import { Component, OnInit, Input } from '@angular/core';
import { AccountProfile } from 'src/app/models/AquariumProfile';
import { AquariumService } from 'src/app/services/aquarium.service';

@Component({
  selector: 'profile-picture-thumbnail',
  templateUrl: './profile-picture-thumbnail.component.html',
  styleUrls: ['./profile-picture-thumbnail.component.scss']
})
export class ProfilePictureThumbnailComponent implements OnInit {

  @Input() public profile: AccountProfile;

  constructor(private  aquariumService: AquariumService) { }

  ngOnInit() {
  }

  public getThumbnail():string {
    return this.profile.thumbnail ? this.aquariumService.getPhotoPermalink(this.profile.thumbnail):"assets/avatarDefault.jpg";
  }
}
