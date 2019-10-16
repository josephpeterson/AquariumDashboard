import { PostCategory } from '../models/PostCategory';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PostBoard } from '../models/PostBoard';
import { PostThread } from '../models/PostThread';
import { Post } from '../models/Post';

@Injectable({
  providedIn: "root"
})
export class DiscussionService {

  private _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.urls.aquariumApi;
  }
  public getAllCategories(): Observable<PostCategory[]> {

    return this.http.get<PostCategory[]>(this._url + "/v1/Post/Categories");
  }
  public createCategory(category: PostCategory): Observable<PostCategory> {
    return this.http.post<PostCategory>(this._url + "/v1/Post/Category", category);
  }
  createBoard(board: PostBoard): Observable<PostBoard> {
    return this.http.post<PostBoard>(this._url + "/v1/Post/Board", board);
  }
  createThread(thread: PostThread): Observable<PostThread> {
    return this.http.post<PostThread>(this._url + "/v1/Post/Thread", thread);
  }
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this._url + "/v1/Post/Post", post);
  }

  public getBoard(boardId: number): Observable<PostBoard> {
    return this.http.get<PostBoard>(this._url + `/v1/Post/Board/${boardId}`);
  }
  public getThread(threadId: number): Observable<PostThread> {
    return this.http.get<PostThread>(this._url + `/v1/Post/Thread/${threadId}`);
  }
  public deleteCategory(categoryId: number) {
    return this.http.delete(this._url + `/v1/Post/Category/${categoryId}`);
  }
}