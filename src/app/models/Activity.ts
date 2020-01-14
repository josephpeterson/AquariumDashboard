import { ActivityTypes } from './types/ActivityTypes';

export class Activity {
  
  id: number;
  activityType: ActivityTypes;
  accountId: number;
  timestamp: Date;
  key1: number;
}