import { CameraConfiguration } from './CameraConfiguration';

export class Aquarium
{
  id: number //= Math.floor(Math.random() * 100);
  name: string
  gallons: number
  type: string
  startDate: Date
  cameraConfiguration: CameraConfiguration
}
