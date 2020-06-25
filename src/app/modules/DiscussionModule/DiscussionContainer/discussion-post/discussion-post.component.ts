import { Component, OnInit, Input } from '@angular/core';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { PostBoard } from 'src/app/models/PostBoard';
import { PostThread } from 'src/app/models/PostThread';
import { Post } from 'src/app/models/Post';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';


@Component({
  selector: 'discussion-post',
  templateUrl: './discussion-post.component.html',
  styleUrls: ['./discussion-post.component.scss']
})
export class DiscussionPostComponent implements OnInit {
  public icon_board = faClipboard;

  @Input("post") post: Post

  Editor = BalloonEditor;
  editorConfig = {
    placeholder: 'Type the content here!',
  };

  constructor() { }

  ngOnInit() {
  }

}
