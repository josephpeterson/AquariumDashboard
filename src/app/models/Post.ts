import { AquariumAccount } from '../modules/SharedDeviceModule/models/AquariumAccount';

export class Post {
  
  id: number;
  authorId: number;
  threadId: number;
  title: string;
  content: string;
  type: string;
  privacy: number;
  timestamp: Date;
  author: AquariumAccount
}

