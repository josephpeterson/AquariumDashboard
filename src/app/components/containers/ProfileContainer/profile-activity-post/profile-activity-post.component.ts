import { Component, OnInit, Input } from '@angular/core';
import { AquariumProfile } from 'src/app/models/AquariumProfile';

@Component({
  selector: 'profile-activity-post',
  templateUrl: './profile-activity-post.component.html',
  styleUrls: ['./profile-activity-post.component.scss']
})
export class ProfileActivityPostComponent implements OnInit {

  @Input() public author: AquariumProfile;

  constructor() { }

  ngOnInit() {
  }

}
