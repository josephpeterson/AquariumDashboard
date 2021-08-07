import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { getSelectedThread, getPostLoadError, isLoadingPost } from 'src/app/store/post/post.selector';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { takeUntil } from 'rxjs/operators';
import { PostSelectThreadAction, PostLoadThreadAction } from 'src/app/store/post/post.actions';
import { PostThread } from 'src/app/models/PostThread';
import { MatDialog } from '@angular/material/dialog';
import { DiscussionService } from 'src/app/services/discussion.service';
import { SnapshotLoadByAquariumAction } from 'src/app/store/snapshot/snapshot.actions';
import { Post } from 'src/app/models/Post';
import { Title } from '@angular/platform-browser';


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

  public post: Post = new Post();

  public error: any;

  constructor(public route: ActivatedRoute,
    public discussionService: DiscussionService,
    public store: Store<AppState>,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.post.content = "";
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
  public postReply(thread: PostThread) {
    this.post.threadId = thread.id;
    //this.disabled = true;
    this.discussionService.createPost(this.post).subscribe(res => {
      this.store.dispatch(new PostLoadThreadAction(thread.id));
      //this._dialog.close();
      //this.disabled = false;
    }, err => {
      //this.disabled = false;
      this.error = err.error;
    });
    this.post = new Post();
  }
  ngOnDestroy() {
    this.componentLifeCycle.next();
    this.componentLifeCycle.unsubscribe();
  }
}
