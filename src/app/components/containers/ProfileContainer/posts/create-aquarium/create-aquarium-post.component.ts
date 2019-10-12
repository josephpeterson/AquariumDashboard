import { Component, OnInit, Input } from '@angular/core';
import { AquariumProfile } from 'src/app/models/AquariumProfile';
import { ActivityTypes } from 'src/app/models/ActivityTypes';
import { AquariumService } from 'src/app/services/aquarium.service';
import { Activity } from 'src/app/models/Activity';
import { Aquarium } from 'src/app/models/Aquarium';

@Component({
  selector: 'create-aquarium-post',
  templateUrl: './create-aquarium-post.component.html',
  styleUrls: ['./create-aquarium-post.component.scss']
})
export class CreateAquariumPostComponent implements OnInit {

  @Input() public author: AquariumProfile;
  @Input() public activity: Activity;;
  public loading: boolean = false;
  public aquarium: Aquarium;

  constructor(public aquariumService: AquariumService) { }

  ngOnInit() {
    this.loadActivityPost();
  }
  loadActivityPost() {
    this.loading = true;
    this.aquariumService.getAquariumById(this.activity.key1).subscribe(data => {
      this.loading = false;
      this.aquarium = data;
    }, err => {
      this.loading = false;
    });
  }
}
