import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostThread } from 'src/app/models/PostThread';
import * as moment from 'moment';

@Component({
  selector: 'post-timestamp',
  templateUrl: './post-timestamp.component.html',
  styleUrls: ['./post-timestamp.component.scss']
})
export class PostTimestampComponent implements OnInit {

  @Input("post")  public post: Post;

  constructor() { }

  ngOnInit() {
  }

  public getTimestamp() {
    return moment(new Date(this.post.timestamp)).local().calendar(); 
  }
}
