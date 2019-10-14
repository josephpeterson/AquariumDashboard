import { AquariumAccount } from './AquariumAccount';
import { PostBoard } from './PostBoard';
import { Post } from './Post';
export class PostThread {
  id: number;
  authorId: number;
  boardId: number;
  title: string;
  type: string;
  privacy: number;
  timestamp: Date;
  author: AquariumAccount;
  board: PostBoard;
  posts: Post[];
}
