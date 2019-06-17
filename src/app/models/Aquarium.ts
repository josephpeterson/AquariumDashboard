import { CameraConfiguration } from './CameraConfiguration';
import { Fish } from './Fish';
import { AquariumFeeding } from './AquariumFeeding';

export class Aquarium
{
  id: number //= Math.floor(Math.random() * 100);
  name: string
  gallons: number
  type: string
  startDate: Date
  cameraConfiguration: CameraConfiguration
  fish: Fish[]

  feedings: AquariumFeeding[] | null
}
