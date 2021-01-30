import { GpioPinTypes } from './GpioPinTypes'

export class DeviceSensor
{
  id: number //= Math.floor(Math.random() * 100);
  name: string
  type: string
  polarity: number
  pin: GpioPinTypes
  value: any
}
