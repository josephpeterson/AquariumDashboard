import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'discussion-container',
  templateUrl: './discussion-container.component.html',
  styleUrls: ['./discussion-container.component.scss']
})
export class DiscussionContainerComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Discussions");
  }

}
