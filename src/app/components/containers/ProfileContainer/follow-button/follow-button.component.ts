import { Component, OnInit, Input } from '@angular/core';
import { AquariumAccount } from 'src/app/models/AquariumAccount';
import { faStar, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss']
})
export class FollowButtonComponent implements OnInit {

  public icon_userPlus = faUserPlus;
  
  @Input() public aquariumAccount: AquariumAccount;
  @Input() public targetAccount: AquariumAccount;

  constructor() { }

  ngOnInit() {
  }

}
