import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { DiscussionService } from 'src/app/services/discussion.service';
import { PostCategory } from 'src/app/models/PostCategory';
import { PostLoadCategoriesSuccessAction, PostLoadCategoriesAction } from 'src/app/store/post/post.actions';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-post-create-category-modal',
  templateUrl: './post-create-category-modal.component.html',
  styleUrls: ['./post-create-category-modal.component.scss']
})
export class PostCreateCategoryModalComponent implements OnInit {

  public category: PostCategory = new PostCategory();
  public disabled: boolean = false;;
  public error;

  constructor(public store: Store<AppState>,
    public discussionService: DiscussionService,
    public _dialog: MatDialogRef<PostCreateCategoryModalComponent>) { }

  ngOnInit() {
  }

  clickSubmit() {
    this.disabled = true;
    this.discussionService.createCategory(this.category).subscribe(category => {
      this.store.dispatch(new PostLoadCategoriesAction());
      this._dialog.close();
      this.disabled = false;
    }, err => {
      this.disabled = false;
      this.error = err.error;
    });
  }
}
