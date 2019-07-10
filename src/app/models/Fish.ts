import { Aquarium } from './Aquarium';
import { Species } from './Species';
import { AquariumFeeding } from './AquariumFeeding';
import { FishSnapshot } from './FishSnapshot';
import { FishNote } from './FishNote';

export class Fish
{
  id?: number //= Math.floor(Math.random() * 100);
  aquariumId: number
  speciesId: number
  gender: string
  name: string = "Test Fish"
  description: string
  date: Date
  
  aquarium: Aquarium
  species: Species | null
  feedings: AquariumFeeding[] | null
  notes: FishNote[] | null
  snapshots: FishSnapshot[] | null
}
