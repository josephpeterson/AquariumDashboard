import { Aquarium } from './Aquarium';

export class AquariumDevice
{
  id?: number //= Math.floor(Math.random() * 100);
  aquariumId: number
  type: string
  port: string
  address: string
  name: string
  enabledTemperature: boolean
  enabledPhoto: boolean
  enabledPh: boolean
  enabledNitrate: boolean
  enabledLighting: boolean
  
  aquarium: Aquarium
}
