import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { PostLoadCategoriesFailAction, PostLoadCategoriesAction, PostResetAction, PostSelectBoardAction, PostSelectThreadAction } from 'src/app/store/post/post.actions';
import { getAllCategories, getPostLoadError, isLoadingPost } from 'src/app/store/post/post.selector';
import { MatDialog } from '@angular/material';
import { ManageSnapshotModal } from 'src/app/modules/SharedModule/modals/manage-snapshot-modal/manage-snapshot-modal.component';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { PostCreateCategoryModalComponent } from 'src/app/modules/SharedModule/modals/post-create-category-modal/post-create-category-modal.component';
import { PostCreateBoardModalComponent } from 'src/app/modules/SharedModule/modals/post-create-board-modal/post-create-board-modal.component';
import { PostCategory } from 'src/app/models/PostCategory';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { PostDeleteCategoryModalComponent } from 'src/app/modules/SharedModule/modals/post-delete-category-modal/post-delete-category-modal.component';
import { PostBoard } from 'src/app/models/PostBoard';
import { PostDeleteBoardModalComponent } from 'src/app/modules/SharedModule/modals/post-delete-board-modal/post-delete-board-modal.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public faPlus = faPlusSquare;
  public faMinus = faMinusSquare;

  public categories$ = this.store.select(getAllCategories);
  public categoriesLoadError$ = this.store.select(getPostLoadError);
  public categoriesLoading$ = this.store.select(isLoadingPost);
  public editing: boolean = false;

  constructor(public store: Store<AppState>,public dialog: MatDialog) { }

  ngOnInit() {
    this.loadCategories();
  }
  public loadCategories() {
    this.store.dispatch(new PostSelectBoardAction(null));
    this.store.dispatch(new PostSelectThreadAction(null));
    this.store.dispatch(new PostLoadCategoriesAction());
  }

  public clickNewCategory() {
    this.dialog.open(PostCreateCategoryModalComponent, {
      width: "50%",
    });
  }
  public clickNewBoard(category: PostCategory) {
    this.dialog.open(PostCreateBoardModalComponent, {
      width: "50%",
      data:  category
    });
  }
  public clickDeleteCategory(category: PostCategory) {
    this.dialog.open(PostDeleteCategoryModalComponent, {
      width: "50%",
      data:  category
    });
  }
  public clickDeleteBoard(board: PostBoard) {
    this.dialog.open(PostDeleteBoardModalComponent, {
      width: "50%",
      data:  board
    });
  }
  public toggleEditing() {
    this.editing = !this.editing;
    console.log(this.editing);
  }
}
