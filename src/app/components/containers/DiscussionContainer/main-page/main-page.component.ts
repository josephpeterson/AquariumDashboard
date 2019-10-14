import { Component, OnInit } from '@angular/core';
import { constructor } from 'q';
import { store } from '@angular/core/src/render3';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { PostLoadCategoriesFailAction, PostLoadCategoriesAction, PostResetAction, PostSelectBoardAction, PostSelectThreadAction } from 'src/app/store/post/post.actions';
import { getAllCategories } from 'src/app/store/post/post.selector';
import { MatDialog } from '@angular/material';
import { ManageSnapshotModal } from 'src/app/components/shared/modals/manage-snapshot-modal/manage-snapshot-modal.component';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { PostCreateCategoryModalComponent } from 'src/app/components/shared/modals/post-create-category-modal/post-create-category-modal.component';
import { PostCreateBoardModalComponent } from 'src/app/components/shared/modals/post-create-board-modal/post-create-board-modal.component';
import { PostCategory } from 'src/app/models/PostCategory';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public categories$ = this.store.select(getAllCategories);

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
}
