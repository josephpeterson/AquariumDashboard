import { Aquarium } from './Aquarium';
import { DeviceScheduledJob } from './DeviceScheduledJob';

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

