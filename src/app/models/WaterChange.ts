import { Aquarium } from './Aquarium';

export class WaterChange
{
  id: number
  aquariumId: number
  gallonsAdded: number
  gallonsRemoved: number
  color: string
  date: Date

  aquarium: Aquarium | null
}

