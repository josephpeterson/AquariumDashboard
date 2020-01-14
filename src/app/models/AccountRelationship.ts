import { CameraConfiguration } from './CameraConfiguration';
import { Fish } from './Fish';
import { AquariumFeeding } from './AquariumFeeding';
import { AquariumDevice } from './AquariumDevice';
import { RelationshipTypes } from './types/RelationshipTypes';

export class AccountRelationship
{
  id: number //= Math.floor(Math.random() * 100);
  accountId: number
  targetId: number
  relationship: RelationshipTypes 
}
