import { Component, OnInit, Input } from '@angular/core';
import { AccountProfile } from 'src/app/models/AquariumProfile';
import { faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "section-banner",
  templateUrl: './section-banner.component.html',
  styleUrls: ['./section-banner.component.scss']
})
export class SectionBannerComponent implements OnInit {

  @Input() public profile: AccountProfile;
  public faGear = faCog;

  constructor() { }

  ngOnInit() {
  }

  public getAquariumCount(): number {
    return this.profile.aquariums.length;
  }
  public getFishCount(): number {
    return this.profile.fish.length;
  }
}
