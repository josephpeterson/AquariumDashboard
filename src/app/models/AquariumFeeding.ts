import { Aquarium } from './Aquarium';
import { Fish } from './Fish';

export class AquariumFeeding
{
  id: number //= Math.floor(Math.random() * 100);
  amount: number
  foodBrand: string 
  foodProduct: string 
  date: Date
  aquariumId: number 
  fishId: number 

  aquarium: Aquarium
  fish: Fish
}
