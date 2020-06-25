//this is modelled from your app.module.ts and the components and 
//services are just arbitrary examples, your module might be different
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { AquariumService } from '../../services/aquarium.service';
import { FishService } from '../../services/fish.service';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
import { AuthGuard } from '../../guards/AuthGuard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AquariumInterceptor } from '../../services/aquarium.interceptor';
import { SharedModule } from '../SharedModule/shared.module';
import { DiscussionRoutes } from './discussion-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MainPageComponent } from './DiscussionContainer/main-page/main-page.component';
import { BoardPageComponent } from './DiscussionContainer/board-page/board-page.component';
import { ThreadPageComponent } from './DiscussionContainer/thread-page/thread-page.component';
import { DiscussionContainerComponent } from './DiscussionContainer/discussion-container.component';
import { DiscussionNavBarComponent } from './DiscussionContainer/discussion-nav-bar/discussion-nav-bar.component';
import { DiscussionItemComponent } from './DiscussionContainer/discussion-item/discussion-item.component';
import { DiscussionPostComponent } from './DiscussionContainer/discussion-post/discussion-post.component';
import { PostEditorComponent } from './DiscussionContainer/post-editor/post-editor.component';
import { PostTimestampComponent } from './DiscussionContainer/post-timestamp/post-timestamp.component';
import { CreateThreadFormComponent } from './DiscussionContainer/board-page/create-thread-form/create-thread-form.component';
import { BoardDetailComponent } from './DiscussionContainer/board-page/board-detail/board-detail.component';
import { PostAuthorBadgeComponent } from './DiscussionContainer/discussion-post/post-author-badge/post-author-badge.component';
import { ThreadBannerComponent } from './DiscussionContainer/thread-page/thread-banner/thread-banner.component';


@NgModule({
  imports: [
    DiscussionRoutes,
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
  ],
  declarations: [
    MainPageComponent,
    BoardPageComponent,
    ThreadPageComponent,
    DiscussionContainerComponent,
    DiscussionNavBarComponent,
    DiscussionItemComponent,
    DiscussionPostComponent,
    PostEditorComponent,
    PostTimestampComponent,
    CreateThreadFormComponent,
    BoardDetailComponent,
    PostAuthorBadgeComponent,
    ThreadBannerComponent,
  ],
  providers: [
    AquariumService,
    FishService,
    AuthService,
    AdminService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AquariumInterceptor, multi: true },
  ],
})
export class DiscussionModule {}