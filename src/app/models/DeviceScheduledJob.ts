import { DeviceScheduleTask } from "./DeviceScheduleTask";
import { JobEndReason } from "./types/JobEndReason";
import { JobStatus } from "./types/JobStatus";

export class DeviceScheduledJob {
  public id: number;
  public deviceId: number;
  public taskId: number;
  public status: JobStatus;
  public endReason: JobEndReason;
  public startTime: string;
  public endTime: string;
  public maximumEndTime: string;
  public updatedAt: string;
  public task: DeviceScheduleTask;
}
