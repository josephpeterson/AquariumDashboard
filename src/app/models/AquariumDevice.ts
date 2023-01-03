import { DeviceSchedule } from '../modules/SharedDeviceModule/models/DeviceSchedule';
import { DeviceScheduleTask } from '../modules/SharedDeviceModule/models/DeviceScheduleTask';
import { DeviceSensor } from '../modules/SharedDeviceModule/models/DeviceSensor';
import { Aquarium } from './Aquarium';
import { CameraConfiguration } from './CameraConfiguration';

export class AquariumDevice
{
  id?: number //= Math.floor(Math.random() * 100);
  aquariumId: number
  type: string
  port: string
  address: string
  privateKey: string
  name: string
  hardwareModel: string
  enabledTemperature: boolean
  enabledPhoto: boolean
  enabledPh: boolean
  enabledNitrate: boolean
  enabledLighting: boolean
  cameraConfiguration: CameraConfiguration
  
  aquarium: Aquarium
  sensors: DeviceSensor[]
  tasks: DeviceScheduleTask[]
  schedules: DeviceSchedule[]
}
