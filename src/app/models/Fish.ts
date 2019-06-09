import { Aquarium } from './Aquarium';

export class Fish
{
  id?: number //= Math.floor(Math.random() * 100);
  aquariumId: number
  speciesId: number
  gender: string
  name: string
  description: string
  date: Date
  aquarium: Aquarium
}
