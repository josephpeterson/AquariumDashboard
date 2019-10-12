import { AquariumAccount } from './AquariumAccount';
import { Fish } from './Fish';
import { Aquarium } from './Aquarium';

export class AquariumProfile
{
  id: number //= Math.floor(Math.random() * 100);

  public permalink: string;
  public thumbnail: string;
  public stars: number;
  public biography: string;

  name: string
  role: string
  email: string;


  public account: AquariumAccount;
  public fish: Fish[];
  public aquariums: Aquarium[];
}
