import { Aquarium } from './Aquarium';
import { Fish } from './Fish';
import { PhotoContent } from './PhotoContent';

export class FishPhoto
{
  id: number
  fishId: number
  photoId: number
  fish: Fish
  photo: PhotoContent
}
