import { Aquarium } from './Aquarium'
import { ATOStatus } from './ATOStatus'
import { DeviceSchedule } from './DeviceSchedule'
import { DeviceScheduledJob } from './DeviceScheduledJob'
import { DeviceSensor } from './DeviceSensor'
import { GpioPinTypes } from './GpioPinTypes'

export class DeviceInformation
{
  version: string
  aquarium: Aquarium
  config: object
  schedules: DeviceSchedule[]
  sensors: DeviceSensor[]
  scheduledJobs: DeviceScheduledJob[]
  atoStatus: ATOStatus
  updatedAt: string
}
