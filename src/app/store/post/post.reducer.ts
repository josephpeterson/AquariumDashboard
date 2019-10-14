import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';
import { AllPostActions, PostActions } from './post.actions';
import { PostCategory } from 'src/app/models/PostCategory';
import { Post } from 'src/app/models/Post';

export interface PostState extends EntityState<PostCategory> {

	loading: boolean
	loaded: boolean
	loadError: HttpErrorResponse

	updating: boolean
	updated: boolean
	updateError: HttpErrorResponse

	selectedBoardId: number
	selectedThreadId: number
}
export const adapter: EntityAdapter<PostCategory> = createEntityAdapter<PostCategory>();

export const defaultPostState: PostState = {
	ids: [],
	entities: {},

	loading: false,
	loaded: false,
	loadError: null,

	updating: false,
	updated: false,
	updateError: null,

	selectedBoardId: null,
	selectedThreadId: null

};
export const initialState: PostState = adapter.getInitialState(defaultPostState);


export function PostReducer(state = initialState, action: AllPostActions): PostState {
	switch (action.type) {

		//Loading
		case PostActions.LoadCategories:
			return {
				...state,
				loading: true,
				//loaded: false,
				//loadError: null,
			}
		case PostActions.LoadCategoriesSuccess:
			return adapter.upsertMany(action.payload, {
				...state,
				loading: false,
				loaded: true,
				loadError: null
			})
		case PostActions.LoadCategoriesFail:
			return {
				...state,
				loading: false,
				//loaded: false,
				loadError: action.payload
			}


		case PostActions.LoadBoard:
			return {
				...state,
				loading: true,
				//loaded: false,
				//loadError: null,
			}
		case PostActions.LoadBoardSuccess:
			var board = action.payload;
			var category = action.payload.category;
			category.boards = [board];


			return adapter.upsertOne(category, {
				...state,
				loading: false,
				loaded: true,
				loadError: null
			})
		case PostActions.LoadCategoriesFail:
			return {
				...state,
				loading: false,
				//loaded: false,
				loadError: action.payload
			}

		case PostActions.LoadThread:
			return {
				...state,
				loading: true,
				//loaded: false,
				//loadError: null,
			}
		case PostActions.LoadThreadSuccess:
			var board = action.payload.board;
			var category = board.category;
			board.threads = [action.payload];
			category.boards = [board];

			return adapter.upsertOne(category, {
				...state,
				loading: false,
				loaded: true,
				loadError: null,
				selectedBoardId: board.id
			})
		case PostActions.LoadThreadFail:
			return {
				...state,
				loading: false,
				//loaded: false,
				loadError: action.payload
			}
		case PostActions.SelectBoard:
			return {
				...state,
				selectedBoardId: action.payload
			}
		case PostActions.SelectThread:
			return {
				...state,
				selectedThreadId: action.payload
			}
		case PostActions.Reset:
			return {
				...defaultPostState
			}
		default:
			return state;
	}
}
export const {
	selectAll,
	selectEntities,
	selectIds,
	selectTotal
} = adapter.getSelectors();