import { Component, OnInit, Input } from '@angular/core';
import { AquariumProfile } from 'src/app/models/AquariumProfile';
import { ActivityTypes } from 'src/app/models/ActivityTypes';

@Component({
  selector: 'general-section',
  templateUrl: './general-section.component.html',
  styleUrls: ['./general-section.component.scss']
})
export class GeneralSectionComponent implements OnInit {

  @Input() public profile: AquariumProfile;

  constructor() { }

  ngOnInit() {
  }

  public ActivityTypes = ActivityTypes;
}
