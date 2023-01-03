import { Aquarium } from './Aquarium';
import { DeviceScheduledJob } from '../modules/SharedDeviceModule/models/DeviceScheduledJob';

export class WaterChange
{
  id: number
  aquariumId: number
  gallonsAdded: number
  gallonsRemoved: number
  color: string
  startTime: string
  endTime: string
  scheduleJobId: number

  aquarium: Aquarium | null
  scheduleJob: DeviceScheduledJob
}

