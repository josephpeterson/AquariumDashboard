import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as PostReducer from './post.reducer';


export const postState = createFeatureSelector<PostReducer.PostState>("post");

export const getPostById = (targetId: number) => createSelector(postState, (state: PostReducer.PostState) => state.entities[targetId]);

export const isLoadingPost = createSelector(postState, (state: PostReducer.PostState) => state.loading);
export const getPostLoadError = createSelector(postState, (state: PostReducer.PostState) => state.loadError);

/* Update */
export const isUpdatingPost = createSelector(postState, (state: PostReducer.PostState) => state.updating);
export const getPostWasUpdated = createSelector(postState, (state: PostReducer.PostState) => state.updated);
export const getPostUpdateError = createSelector(postState, (state: PostReducer.PostState) => state.updateError);



export const getAllCategories = createSelector(postState, PostReducer.selectAll);

export const getSelectedBoard = createSelector(postState,
    (state: PostReducer.PostState) => {
        for (var cId in state.entities) {
            var c = state.entities[cId];
            for (var i = 0; i < c.boards.length; i++) {
                var b = c.boards[i];
                if (b.id == state.selectedBoardId)
                {
                    console.log(b);
                    return b;
                }
            }
        }
    }
);
export const getSelectedThread = createSelector(postState,
    (state: PostReducer.PostState) => {
        for (var cId in state.entities) {
            var c = state.entities[cId];
            for (var i = 0; i < c.boards.length; i++) {
                var b = c.boards[i];
                if(!b.threads) continue;
                for(var j=0;j< b.threads.length;j++)
                {
                    var t = b.threads[j];
                    if (t.id == state.selectedThreadId)
                    {
                        console.log(t);
                        return t;
                    }
                }
            }
        }
    }
);