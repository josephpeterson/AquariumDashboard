import { Component, OnInit, Inject } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { DiscussionService } from 'src/app/services/discussion.service';
import { PostLoadCategoriesSuccessAction, PostLoadCategoriesAction } from 'src/app/store/post/post.actions';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PostBoard } from 'src/app/models/PostBoard';
import { PostCategory } from 'src/app/models/PostCategory';

@Component({
  selector: 'app-post-create-board-modal',
  templateUrl: './post-create-board-modal.component.html',
  styleUrls: ['./post-create-board-modal.component.scss']
})
export class PostCreateBoardModalComponent implements OnInit {

  public board: PostBoard = new PostBoard();
  public disabled: boolean = false;
  public error;

  constructor(@Inject(MAT_DIALOG_DATA) public category: PostCategory,
    public store: Store<AppState>,
    public discussionService: DiscussionService,
    public _dialog: MatDialogRef<PostCreateBoardModalComponent>) { }

  ngOnInit() {
  }

  clickSubmit() {
    this.board.categoryId = this.category.id;
    this.disabled = true;
    this.discussionService.createBoard(this.board).subscribe(board => {
      this.store.dispatch(new PostLoadCategoriesAction());
      this._dialog.close();
      this.disabled = false;
    }, err => {
      this.disabled = false;
      this.error = err.error;
    });
  }
}
