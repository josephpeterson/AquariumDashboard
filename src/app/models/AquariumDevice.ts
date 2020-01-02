import { Aquarium } from './Aquarium';
import { CameraConfiguration } from './CameraConfiguration';
import { DeviceScheduleAssignment } from './DeviceScheduleAssignment';

export class AquariumDevice
{
  id?: number //= Math.floor(Math.random() * 100);
  aquariumId: number
  type: string
  port: string
  address: string
  privateKey: string
  name: string
  enabledTemperature: boolean
  enabledPhoto: boolean
  enabledPh: boolean
  enabledNitrate: boolean
  enabledLighting: boolean
  cameraConfiguration: CameraConfiguration
  
  aquarium: Aquarium

  scheduleAssignments: DeviceScheduleAssignment[]
}
