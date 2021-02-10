export class DeviceScheduleTask
{
  id: number //= Math.floor(Math.random() * 100);
  scheduleId: number
  startTime: any | null
  endTime: any | null
  interval: number | null = 30
  taskId: number
}
export enum DeviceScheduleTaskTypes {
  Unknown = 0,
  Snapshot = 1,
  StartATO = 2,
}