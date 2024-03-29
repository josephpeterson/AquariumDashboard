import { AquariumAccount } from '../modules/SharedDeviceModule/models/AquariumAccount';
import { Notification } from './Notification';
export class DispatchedNotification {
  id: number;
  type: number;
  dispatcherId: number;
  date: Date;
  expireDate: Date;
  notifications: Notification[];
  dispatcher: AquariumAccount;
  title: string;
  subtitle: string;
  body: string;
}
