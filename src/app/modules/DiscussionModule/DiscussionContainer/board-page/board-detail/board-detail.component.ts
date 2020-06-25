import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { getSelectedBoard, getPostLoadError, isLoadingPost } from 'src/app/store/post/post.selector';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { PostSelectThreadAction, PostSelectBoardAction, PostLoadBoardAction } from 'src/app/store/post/post.actions';
import { PostBoard } from 'src/app/models/PostBoard';
import { PostCreateThreadModalComponent } from 'src/app/modules/SharedModule/modals/post-create-thread-modal/post-create-thread-modal.component';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss']
})
export class BoardDetailComponent {

  public componentLifeCycle = new Subject();
  public board$ = this.store.select(getSelectedBoard);
  public boardLoadError$ = this.store.select(getPostLoadError);
  public boardLoading$ = this.store.select(isLoadingPost);

  constructor(public route: ActivatedRoute,
    public store: Store<AppState>,
    public dialog: MatDialog) { }
    
  public clickNewThread(board: PostBoard) {
    this.dialog.open(PostCreateThreadModalComponent, {
      width: "50%",
      data: board
    });
  }
}
