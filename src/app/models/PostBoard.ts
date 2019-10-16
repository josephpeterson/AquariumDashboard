import { AquariumAccount } from './AquariumAccount';
import { PostCategory } from './PostCategory';
import { PostThread } from './PostThread';
export class PostBoard {
  id: number;
  authorId: number;
  categoryId: number;
  title: string;
  description: string;
  type: string;
  privacy: number;
  timestamp: Date;
  author: AquariumAccount;
  category: PostCategory;
  threads: PostThread[];
}
