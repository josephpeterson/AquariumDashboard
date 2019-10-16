import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { getSelectedThread, getPostLoadError, isLoadingPost, getSelectedBoard } from 'src/app/store/post/post.selector';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { PostSelectThreadAction, PostLoadThreadAction } from 'src/app/store/post/post.actions';
import { Title } from '@angular/platform-browser';
import { PostThread } from 'src/app/models/PostThread';
import { PostBoard } from 'src/app/models/PostBoard';

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

  public selectedThread: PostThread;
  public selectedBoard: PostBoard;

  constructor(public route: ActivatedRoute,
    public store: Store<AppState>,
    public dialog: MatDialog,
    private titleService: Title) { }

  ngOnInit() {
    this.selectedThread$.pipe(takeUntil(this.componentLifeCycle)).subscribe(thread => {
      this.selectedThread = thread;
      this.updateTitle();
    });
    this.selectedBoard$.pipe(takeUntil(this.componentLifeCycle)).subscribe(board => {
      this.selectedBoard = board;
      this.updateTitle();
    });
  }
  ngOnDestroy() {
    this.componentLifeCycle.next();
    this.componentLifeCycle.unsubscribe();
  }
  private updateTitle() {
    if (this.selectedThread)
      this.titleService.setTitle(this.selectedThread.title);
    else if (this.selectedBoard)
      this.titleService.setTitle(this.selectedBoard.title);
    else
      this.titleService.setTitle("Discussions");
  }
}
