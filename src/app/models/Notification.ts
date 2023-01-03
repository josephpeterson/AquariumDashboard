import { Aquarium } from './Aquarium';
import { Species } from './Species';
import { AquariumFeeding } from './AquariumFeeding';
import { FishSnapshot } from './FishSnapshot';
import { FishNote } from './FishNote';
import { FishPhoto } from './FishPhoto';
import { AquariumAccount } from '../modules/SharedDeviceModule/models/AquariumAccount';
import { DispatchedNotification } from './DispatchedNotification';

export class Notification
{
  id: number
  sourceId: number
  targetId: number
  dismissed: boolean;
  
  source: DispatchedNotification
  target: AquariumAccount
}

