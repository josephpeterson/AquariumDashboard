import { Component, OnInit, Input } from '@angular/core';
import { AquariumAccount } from 'src/app/models/AquariumAccount';

@Component({
  selector: 'post-author-badge',
  templateUrl: './post-author-badge.component.html',
  styleUrls: ['./post-author-badge.component.scss']
})
export class PostAuthorBadgeComponent implements OnInit {

  @Input("author") public author: AquariumAccount;
  
  constructor() { }

  ngOnInit() {
  }

}
