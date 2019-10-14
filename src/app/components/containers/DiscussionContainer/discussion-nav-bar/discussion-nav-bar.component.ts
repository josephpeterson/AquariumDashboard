import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { getSelectedThread, getPostLoadError, isLoadingPost, getSelectedBoard } from 'src/app/store/post/post.selector';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { PostSelectThreadAction, PostLoadThreadAction } from 'src/app/store/post/post.actions';

@Component({
  selector: 'discussion-nav-bar',
  templateUrl: './discussion-nav-bar.component.html',
  styleUrls: ['./discussion-nav-bar.component.scss']
})
export class DiscussionNavBarComponent implements OnInit {

  public componentLifeCycle = new Subject();
  public selectedThread$ = this.store.select(getSelectedThread);
  public selectedBoard$ = this.store.select(getSelectedBoard);
  public threadLoadError$ = this.store.select(getPostLoadError);
  public threadLoading$ = this.store.select(isLoadingPost);

  constructor(public route: ActivatedRoute,
    public store: Store<AppState>,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.route.params.pipe(takeUntil(this.componentLifeCycle)).subscribe(params => {
      var threadId = params.threadId;
      this.loadThread(threadId);
    });
  }
  loadThread(threadId: any) {
    this.store.dispatch(new PostSelectThreadAction(threadId));
    this.store.dispatch(new PostLoadThreadAction(threadId));
  }
}
