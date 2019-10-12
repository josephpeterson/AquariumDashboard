import { Component, OnInit, Input } from '@angular/core';
import { AquariumProfile } from 'src/app/models/AquariumProfile';

@Component({
  selector: "section-banner",
  templateUrl: './section-banner.component.html',
  styleUrls: ['./section-banner.component.scss']
})
export class SectionBannerComponent implements OnInit {

  @Input() public profile: AquariumProfile;

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
