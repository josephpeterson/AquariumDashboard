import { Aquarium } from './Aquarium';

export class Equipment
{
  id: number
  type: string
  productBrand: string
  subBrand: string
  aquarium: Aquarium | null
}
