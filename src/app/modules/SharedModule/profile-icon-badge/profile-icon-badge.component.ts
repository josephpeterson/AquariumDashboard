import { Component, OnInit, Input } from '@angular/core';
import { AccountProfile } from 'src/app/models/AquariumProfile';
import { AquariumService } from 'src/app/services/aquarium.service';

@Component({
  selector: 'profile-icon-badge',
  templateUrl: './profile-icon-badge.component.html',
  styleUrls: ['./profile-icon-badge.component.scss']
})
export class ProfileIconBadgeComponent implements OnInit {

  @Input() public profile: AccountProfile;

  constructor(private  aquariumService: AquariumService) { }

  ngOnInit() {
  }

  public getThumbnail():string {
    return this.profile.thumbnail ? this.aquariumService.getPhotoPermalink(this.profile.thumbnail):"assets/avatarDefault.jpg";
  }
}
