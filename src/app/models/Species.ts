export class Species
{
  id: number //= Math.floor(Math.random() * 100);
  name: string
  description: string
  website: string
  careLevel: string
  thumbnail: string
  temperatureMin: number
  temperatureMax: number
  phMin: number
  phMax: number
  primaryColor: string
  secondaryColor: string
  price: number
  maxSize: number
  minimumGallons: number
  lifespan: number


  fishCount: number
  aquariumCount: number
  //type: string

  constructor(source?: any){
    Object.assign(this,source);
  }
}
