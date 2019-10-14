import { PostBoard } from "./PostBoard";
export class PostCategory {
  id: number;
  name: string;
  privacy: number;
  boards: PostBoard[];
}
