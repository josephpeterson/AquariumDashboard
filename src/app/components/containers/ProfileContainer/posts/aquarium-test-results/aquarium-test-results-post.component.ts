import { Component, OnInit, Input } from '@angular/core';
import { AccountProfile } from 'src/app/models/AquariumProfile';
import { ActivityTypes } from 'src/app/models/ActivityTypes';
import { AquariumService } from 'src/app/services/aquarium.service';
import { Activity } from 'src/app/models/Activity';
import { Aquarium } from 'src/app/models/Aquarium';

@Component({
  selector: 'aquarium-test-results-post',
  templateUrl: './aquarium-test-results-post.component.html',
  styleUrls: ['./aquarium-test-results-post.component.scss']
})
export class AquariumTestResultsPostComponent implements OnInit {

  @Input() public author: AccountProfile;
  @Input() public activity: any;
  public loading: boolean = false;
  public aquarium: Aquarium;

  constructor(public aquariumService: AquariumService) { }

  ngOnInit() {
    this.loadActivityPost();
  }
  loadActivityPost() {
    this.loading = true;
    this.aquariumService.getAccountActivity(this.activity.id).subscribe(data => {
      this.loading = false;
      this.activity = data;
    }, err => {
      this.loading = false;
    });
  }
}
