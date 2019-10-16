import { AccountProfile } from './AquariumProfile';

export class AquariumAccount
{
  id: number //= Math.floor(Math.random() * 100);
  username: string
  role: string
  email: string;
  profile: AccountProfile
}
