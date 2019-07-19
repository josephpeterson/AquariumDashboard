import { CameraConfiguration } from './CameraConfiguration';
import { Fish } from './Fish';
import { AquariumFeeding } from './AquariumFeeding';
import { AquariumDevice } from './AquariumDevice';

export class Aquarium
{
  id: number //= Math.floor(Math.random() * 100);
  name: string
  gallons: number
  type: string
  startDate: Date
  fish: Fish[]

  feedings: AquariumFeeding[] | null
  device?: AquariumDevice | null
}
