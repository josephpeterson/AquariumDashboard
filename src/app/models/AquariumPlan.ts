import { Aquarium } from './Aquarium';

export class AquariumPlan
{
  id: number
  fish: boolean
  planted: boolean
  largeFish: boolean
  pressurizedCo2: boolean
  highMaintence: boolean
  bottomless: boolean
  breeder: boolean

  aquarium: Aquarium | null
}
