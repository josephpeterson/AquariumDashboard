import { Aquarium } from './Aquarium'
import { ATOStatus } from './ATOStatus'
import { DeviceSchedule } from './DeviceSchedule'
import { DeviceSensor } from './DeviceSensor'
import { GpioPinTypes } from './GpioPinTypes'

export class DeviceInformation
{
  aquarium: Aquarium
  config: object
  schedules: DeviceSchedule[]
  sensors: DeviceSensor[]
  atoStatus: ATOStatus
}
