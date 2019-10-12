import { Component, OnInit, Input } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { AquariumAccount } from 'src/app/models/AquariumAccount';

@Component({
  selector: 'star-button',
  templateUrl: './star-button.component.html',
  styleUrls: ['./star-button.component.scss']
})
export class StarButtonComponent implements OnInit {

  public icon_star = faStar;
  
  @Input() public aquariumAccount: AquariumAccount;
  @Input() public stars: number;
  @Input() public targetAccount: AquariumAccount;

  constructor() { }

  ngOnInit() {
  }

}
