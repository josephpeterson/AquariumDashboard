import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../guards/AuthGuard';
import { DiscussionContainerComponent } from './DiscussionContainer/discussion-container.component';
import { BoardPageComponent } from './DiscussionContainer/board-page/board-page.component';
import { CreateThreadFormComponent } from './DiscussionContainer/board-page/create-thread-form/create-thread-form.component';
import { BoardDetailComponent } from './DiscussionContainer/board-page/board-detail/board-detail.component';
import { ThreadPageComponent } from './DiscussionContainer/thread-page/thread-page.component';
import { MainPageComponent } from './DiscussionContainer/main-page/main-page.component';

const secondaryRoutes: Routes = [
    {
        path: '',
        component: DiscussionContainerComponent,
        canActivate: [AuthGuard],
        children: [{
            path: 'board/:boardId',
            component: BoardPageComponent,
            children: [
                {
                    path: 'new',
                    component: CreateThreadFormComponent
                },
                {
                    path: '**',
                    component: BoardDetailComponent
                }]
        },
        {
            path: 'thread/:threadId',
            component: ThreadPageComponent
        },
        {
            path: '',
            component: MainPageComponent
        }]
    },
];

//taken from angular.io
//Only call RouterModule.forRoot in the root AppRoutingModule (or the AppModule if 
//that's where you register top level application routes). In any other module, you 
//must call the RouterModule.forChild method to register additional routes.

export const DiscussionRoutes: ModuleWithProviders = RouterModule.forChild(secondaryRoutes)