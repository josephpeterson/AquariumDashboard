import { Component, OnInit } from '@angular/core';
import { PostThread } from 'src/app/models/PostThread';
import { Post } from 'src/app/models/Post';
import { getSelectedBoard } from 'src/app/store/post/post.selector';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { PostBoard } from 'src/app/models/PostBoard';
import { Router } from '@angular/router';
import { DiscussionService } from 'src/app/services/discussion.service';

@Component({
  selector: 'app-create-thread-form',
  templateUrl: './create-thread-form.component.html',
  styleUrls: ['./create-thread-form.component.scss']
})
export class CreateThreadFormComponent implements OnInit {

  public board$ = this.store.select(getSelectedBoard);

  public thread: PostThread = new PostThread();
  public post: Post = new Post();
  public disabled: boolean;
  error: any;

  constructor(public store: Store<AppState>,
    public router: Router,
    public discussionService: DiscussionService) {
    this.thread.posts = [this.post];
    this.post.content = "";
  }

  ngOnInit() {
  }

  public clickSubmit(board: PostBoard) {
    this.thread.boardId = board.id;

    console.log(this.thread);

    this.disabled = true;
    this.discussionService.createThread(this.thread).subscribe(thread => {
      //this.store.dispatch(new PostLoadCategoriesAction());
      this.disabled = false;
      this.router.navigateByUrl(`/discussion/thread/${thread.id}`);
    }, err => {
      this.disabled = false;
      this.error = err.error;
    });
  }
}
