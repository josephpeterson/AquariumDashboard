import { Component, OnInit, Input } from '@angular/core';
import { AccountProfile } from 'src/app/models/AquariumProfile';
import { ActivityTypes } from 'src/app/models/types/ActivityTypes';

@Component({
  selector: 'profile-activity-post',
  templateUrl: './profile-activity-post.component.html',
  styleUrls: ['./profile-activity-post.component.scss']
})
export class ProfileActivityPostComponent implements OnInit {

  @Input() public author: AccountProfile;
  @Input() public activity;

  constructor() { }

  ngOnInit() {
  }

  public getTitleForActivity(activity) {
    switch (activity.activityType) {
      case ActivityTypes.CreateAquariumActivity:
        return `Created an aquarium ${activity.key1}`;
      case ActivityTypes.DeleteAquariumActivity:
        return `Deleted an aquarium ${activity.key1}`;
      default:
        return `${activity.activityType}`
    }
  }
}
