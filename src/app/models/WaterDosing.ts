import { Aquarium } from './Aquarium';
export class WaterDosing {
  id: number;
  aquariumId: number;
  type: string;
  brand: string;
  product: string;
  amount: number;
  color: string;
  date: Date;
  aquarium: Aquarium | null;
}
