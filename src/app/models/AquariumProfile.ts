import { AquariumAccount } from './AquariumAccount';
import { Fish } from './Fish';
import { Aquarium } from './Aquarium';
import { Activity } from './Activity';
import { AccountRelationship } from './AccountRelationship';
import { PhotoContent } from './PhotoContent';

export class AccountProfile
{
  id: number //= Math.floor(Math.random() * 100);

  public permalink: string;
  public thumbnail: PhotoContent;
  public thumbnailId: number;
  public stars: number;
  public biography: string;

  name: string
  role: string
  email: string;


  public account: AquariumAccount;
  public activity: Activity[];
  public fish: Fish[];
  public aquariums: Aquarium[];
  public relationship: AccountRelationship;
}
