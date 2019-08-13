import { Aquarium } from './Aquarium';
import { Fish } from './Fish';

export class FishPhoto
{
  id: number
  aquariumId: number
  fishId: number
  aquarium: Aquarium
  fish: Fish
  date: Date
}
