import { Aquarium } from './Aquarium';

export class Substrate
{
  id: number
  type: string
  productBrand: string
  color: string
  height: number
  inert: boolean
  aquarium: Aquarium | null
}
