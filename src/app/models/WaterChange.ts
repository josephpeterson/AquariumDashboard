import { Aquarium } from './Aquarium';

export class WaterChange
{
  id: number
  aquariumId: number
  additive: boolean
  gallons: number
  color: string
  date: Date

  aquarium: Aquarium | null
}

