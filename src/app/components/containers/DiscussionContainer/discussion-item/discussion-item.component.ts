import { Component, OnInit, Input } from '@angular/core';
import { PostBoard } from 'src/app/models/PostBoard';
import { PostThread } from 'src/app/models/PostThread';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'discussion-item',
  templateUrl: './discussion-item.component.html',
  styleUrls: ['./discussion-item.component.scss']
})
export class DiscussionItemComponent implements OnInit {
  public icon_board = faClipboard;
  
  @Input("board") public board: PostBoard;
  @Input("thread") public thread: PostThread;

  constructor() { }

  ngOnInit() {
  }

}
