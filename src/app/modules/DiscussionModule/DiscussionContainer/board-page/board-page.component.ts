import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ProfileSelectAction, ProfileLoadAction } from 'src/app/store/profile/profile.actions';
import { Subject } from 'rxjs';
import { PostSelectBoardAction, PostLoadBoardAction, PostResetAction, PostSelectThreadAction, PostLoadBoardSuccessAction } from 'src/app/store/post/post.actions';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { getSelectedBoard, getPostLoadError, isLoadingPost } from 'src/app/store/post/post.selector';
import { PostThread } from 'src/app/models/PostThread';
import { PostCreateBoardModalComponent } from 'src/app/modules/SharedModule/modals/post-create-board-modal/post-create-board-modal.component';
import { MatDialog } from '@angular/material';
import { PostCreateThreadModalComponent } from 'src/app/modules/SharedModule/modals/post-create-thread-modal/post-create-thread-modal.component';
import { PostBoard } from 'src/app/models/PostBoard';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {

  public componentLifeCycle = new Subject();
  public board$ = this.store.select(getSelectedBoard);
  public boardLoadError$ = this.store.select(getPostLoadError);
  public boardLoading$ = this.store.select(isLoadingPost);

  constructor(public route: ActivatedRoute,
    public store: Store<AppState>,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.route.params.pipe(takeUntil(this.componentLifeCycle)).subscribe(params => {
      var boardId = params.boardId;
      this.loadBoard(boardId);
    });
  }
  loadBoard(boardId: any) {
    this.store.dispatch(new PostSelectThreadAction(null));
    this.store.dispatch(new PostSelectBoardAction(boardId));
    this.store.dispatch(new PostLoadBoardAction(boardId));
  }
  ngOnDestroy() {
    this.componentLifeCycle.next();
    this.componentLifeCycle.unsubscribe();
  }
}
