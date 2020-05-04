export class DeviceScheduleTask
{
  id: number //= Math.floor(Math.random() * 100);
  scheduleId: number
  startTime: Date | null
  endTime: Date | null
  interval: number | null = 30
  taskId: number
}
