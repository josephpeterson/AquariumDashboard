import { Component, OnInit, Input } from '@angular/core';
import { PostThread } from 'src/app/models/PostThread';

@Component({
  selector: 'thread-banner',
  templateUrl: './thread-banner.component.html',
  styleUrls: ['./thread-banner.component.scss']
})
export class ThreadBannerComponent implements OnInit {

  @Input("thread") thread: PostThread;
  
  constructor() { }

  ngOnInit() {
  }

}
