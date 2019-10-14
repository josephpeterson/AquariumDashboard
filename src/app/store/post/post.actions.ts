import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http'
import { Update } from '@ngrx/entity'
import { PostCategory } from 'src/app/models/PostCategory'
import { PostBoard } from 'src/app/models/PostBoard';
import { PostThread } from 'src/app/models/PostThread';


export enum PostActions {
    LoadCategories = '[Post] LoadCategories',
    LoadCategoriesSuccess = '[Post] LoadCategoriesSuccess',
    LoadCategoriesFail = '[Post] LoadCategoriesFail',

    CreateCategory = '[Post] CreateCategory',


    LoadBoard = '[Post] LoadBoard',
    LoadBoardSuccess = '[Post] LoadBoardSuccess',
    LoadBoardFail = '[Post] LoadBoardFail',

    LoadThread = '[Post] LoadThread',
    LoadThreadSuccess = '[Post] LoadThreadSuccess',
    LoadThreadFail = '[Post] LoadThreadFail',

    SelectBoard = '[Post] SelectBoard',
    SelectThread = '[Post] SelectThread',
    Reset = '[Post] Reset',
}

/* Loading */
export class PostLoadCategoriesAction implements Action {
    readonly type = PostActions.LoadCategories
    constructor() { }
}
export class PostLoadCategoriesSuccessAction implements Action {
    readonly type = PostActions.LoadCategoriesSuccess
    constructor(public payload: PostCategory[]) { }
}
export class PostLoadCategoriesFailAction implements Action {
    readonly type = PostActions.LoadCategoriesFail
    constructor(public payload: HttpErrorResponse) { }
}

export class PostLoadBoardAction implements Action {
    readonly type = PostActions.LoadBoard
    constructor(public payload: number) { }

}
export class PostLoadBoardSuccessAction implements Action {
    readonly type = PostActions.LoadBoardSuccess
    constructor(public payload: PostBoard) { }
}
export class PostLoadBoardFailAction implements Action {
    readonly type = PostActions.LoadBoardFail
    constructor(public payload: HttpErrorResponse) { }
}

export class PostLoadThreadAction implements Action {
    readonly type = PostActions.LoadThread
    constructor(public payload: number) { }

}
export class PostLoadThreadSuccessAction implements Action {
    readonly type = PostActions.LoadThreadSuccess
    constructor(public payload: PostThread) { }
}
export class PostLoadThreadFailAction implements Action {
    readonly type = PostActions.LoadThreadFail
    constructor(public payload: HttpErrorResponse) { }
}
export class PostSelectBoardAction implements Action {
    readonly type = PostActions.SelectBoard
    constructor(public payload: number) {
    }
}
export class PostSelectThreadAction implements Action {
    readonly type = PostActions.SelectThread
    constructor(public payload: number) {
    }
}
export class PostResetAction implements Action {
    readonly type = PostActions.Reset
    constructor() {
    }
}
export type AllPostActions =
    PostLoadCategoriesAction |
    PostLoadCategoriesSuccessAction |
    PostLoadCategoriesFailAction |
    PostLoadBoardAction |
    PostLoadBoardSuccessAction |
    PostLoadBoardFailAction |
    PostLoadThreadAction |
    PostLoadThreadSuccessAction |
    PostLoadThreadFailAction |
    PostSelectBoardAction |
    PostSelectThreadAction |
    PostResetAction;