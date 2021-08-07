import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostCategory } from 'src/app/models/PostCategory';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { DiscussionService } from 'src/app/services/discussion.service';
import { PostCreateBoardModalComponent } from '../post-create-board-modal/post-create-board-modal.component';
import { PostLoadCategoriesAction, PostResetAction } from 'src/app/store/post/post.actions';

@Component({
  selector: 'app-post-delete-category-modal',
  templateUrl: './post-delete-category-modal.component.html',
  styleUrls: ['./post-delete-category-modal.component.scss']
})
export class PostDeleteCategoryModalComponent implements OnInit {
  public disabled: boolean;
  public error: string;

  constructor(@Inject(MAT_DIALOG_DATA) public category: PostCategory,
    public store: Store<AppState>,
    public discussionService: DiscussionService,
    public _dialog: MatDialogRef<PostCreateBoardModalComponent>) { }
  ngOnInit() {
  }
  clickSubmit() {
    this.disabled = true;
    this.discussionService.deleteCategory(this.category.id).subscribe(res => {
      this.store.dispatch(new PostResetAction());
      this.store.dispatch(new PostLoadCategoriesAction());
      this._dialog.close();
      this.disabled = false;
    }, err => {
      this.disabled = false;
      this.error = err.error;
    });
  }
}
