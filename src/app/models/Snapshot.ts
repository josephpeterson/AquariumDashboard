import { Aquarium } from './Aquarium';

export class Snapshot
{
  id: number //= Math.floor(Math.random() * 100);
  aquarium: Aquarium
  aquariumId: number
  date: Date
  ammonia: number
  nitrite: number
  nitrate: number
  ph: number
  temperature: number
  photoPath: number
}
