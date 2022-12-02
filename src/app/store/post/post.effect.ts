import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostLoadCategoriesAction, PostLoadCategoriesSuccessAction, PostLoadCategoriesFailAction, PostActions, PostLoadBoardAction, PostLoadBoardSuccessAction, PostLoadThreadAction, PostLoadThreadSuccessAction, PostLoadThreadFailAction } from './post.actions';
import { DiscussionService } from 'src/app/services/discussion.service';
import { PostCategory } from 'src/app/models/PostCategory';
import { PostBoard } from 'src/app/models/PostBoard';
import { PostThread } from 'src/app/models/PostThread';

@Injectable()
export class PostEffects {
    constructor(private discussionService: DiscussionService,
        private actions$: Actions) {

    }

    loadDiscussionCategories$ = createEffect(() => this.actions$.pipe(ofType<PostLoadCategoriesAction>(PostActions.LoadCategories),
        mergeMap(() => this.discussionService.getAllCategories().pipe(
            map((categories: PostCategory[]) => new PostLoadCategoriesSuccessAction(categories)),
            catchError(error => of(new PostLoadCategoriesFailAction(error)))
        ))));

    loadBoard$ = createEffect(() => this.actions$.pipe(ofType<PostLoadBoardAction>(PostActions.LoadBoard),
        mergeMap((action) => this.discussionService.getBoard(action.payload).pipe(
            map((threads: PostBoard) => new PostLoadBoardSuccessAction(threads)),
            catchError(error => of(new PostLoadCategoriesFailAction(error)))
        ))));

    loadThread$ = createEffect(() => this.actions$.pipe(ofType<PostLoadThreadAction>(PostActions.LoadThread),
        mergeMap((action) => this.discussionService.getThread(action.payload).pipe(
            map((thread: PostThread) => new PostLoadThreadSuccessAction(thread)),
            catchError(error => of(new PostLoadThreadFailAction(error)))
        ))));
}