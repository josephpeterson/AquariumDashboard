import { DeviceScheduledJob } from "../modules/SharedDeviceModule/models/DeviceScheduledJob";
import { GpioPinValue } from "./types/GpioPinValue";

export class ATOStatus {
  id: number;
  aquariumId: number;
  startTime: string;
  endTime: string;
  mlPerSec: number;
  scheduleJobId: number;

  scheduleJob: DeviceScheduledJob
}