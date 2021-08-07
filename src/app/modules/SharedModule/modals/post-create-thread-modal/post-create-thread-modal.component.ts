import { Component, OnInit, Inject } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { DiscussionService } from 'src/app/services/discussion.service';
import { PostThread } from 'src/app/models/PostThread';
import { PostLoadCategoriesSuccessAction, PostLoadCategoriesAction } from 'src/app/store/post/post.actions';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostBoard } from 'src/app/models/PostBoard';

@Component({
  selector: 'app-post-create-thread-modal',
  templateUrl: './post-create-thread-modal.component.html',
  styleUrls: ['./post-create-thread-modal.component.scss']
})
export class PostCreateThreadModalComponent implements OnInit {

  public thread: PostThread = new PostThread();
  public disabled: boolean = false;;
  public error;

  constructor(@Inject(MAT_DIALOG_DATA) public board: PostBoard,
  public store: Store<AppState>,
    public discussionService: DiscussionService,
    public _dialog: MatDialogRef<PostCreateThreadModalComponent>) { }

  ngOnInit() {
  }

  clickSubmit() {
    this.thread.boardId = this.board.id;
    this.disabled = true;
    this.discussionService.createThread(this.thread).subscribe(thread => {
      this.store.dispatch(new PostLoadCategoriesAction());
      this._dialog.close();
      this.disabled = false;
    }, err => {
      this.disabled = false;
      this.error = err.error;
    });
  }
}
