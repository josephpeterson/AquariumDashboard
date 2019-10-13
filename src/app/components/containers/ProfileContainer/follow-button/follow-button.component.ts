import { Component, OnInit, Input } from '@angular/core';
import { faStar, faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { AccountRelationship } from '../../../../models/AccountRelationship';
import { RelationshipTypes } from 'src/app/models/RelationshipTypes';
import { AquariumService } from 'src/app/services/aquarium.service';

@Component({
  selector: 'follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss']
})
export class FollowButtonComponent implements OnInit {

  public icon_userPlus = faUserPlus;
  public icon_userMinus = faUserMinus;
  public loading: boolean = false;

  @Input() public relationship: AccountRelationship;
  public RelationshipTypes = RelationshipTypes;

  constructor(public aquariumService: AquariumService) { }

  ngOnInit() {
  }

  clickButton() {
    if(this.loading) return;
    this.loading = true;
    this.aquariumService.upsertFollowUser(this.relationship).subscribe(rel => {
      this.relationship = rel;
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }
}
