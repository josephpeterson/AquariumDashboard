import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { getSelectedThread, getPostLoadError, isLoadingPost } from 'src/app/store/post/post.selector';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { takeUntil } from 'rxjs/operators';
import { PostSelectThreadAction, PostLoadThreadAction } from 'src/app/store/post/post.actions';
import { PostThread } from 'src/app/models/PostThread';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-thread-page',
  templateUrl: './thread-page.component.html',
  styleUrls: ['./thread-page.component.scss']
})
export class ThreadPageComponent implements OnInit {

  public componentLifeCycle = new Subject();
  public thread$ = this.store.select(getSelectedThread);
  public threadLoadError$ = this.store.select(getPostLoadError);
  public threadLoading$ = this.store.select(isLoadingPost);

  constructor(public route: ActivatedRoute,
    public store: Store<AppState>,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.route.params.pipe(takeUntil(this.componentLifeCycle)).subscribe(params => {
      var threadId = params.threadId;
      console.log(threadId);
      this.loadThread(threadId);
    });
  }
  loadThread(threadId: any) {
    this.store.dispatch(new PostSelectThreadAction(threadId));
    this.store.dispatch(new PostLoadThreadAction(threadId));
  }
}
