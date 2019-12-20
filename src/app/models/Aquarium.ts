import { CameraConfiguration } from './CameraConfiguration';
import { Fish } from './Fish';
import { AquariumFeeding } from './AquariumFeeding';
import { AquariumDevice } from './AquariumDevice';
import { Substrate } from './Substrate';
import { Equipment } from './Equipment';
import { AquariumPlan } from './AquariumPlan';
import { AquariumSnapshot } from './AquariumSnapshot';

export class Aquarium
{
  id: number //= Math.floor(Math.random() * 100);
  ownerId: number //= Math.floor(Math.random() * 100);
  name: string
  gallons: number
  type: string
  startDate: Date
  fish: Fish[]
  waterSalinity: number

  equipment: Equipment[]
  substrate: Substrate
  plan: AquariumPlan
  
  feedings: AquariumFeeding[] | null
  device?: AquariumDevice | null
  snapshots: AquariumSnapshot[]
}
