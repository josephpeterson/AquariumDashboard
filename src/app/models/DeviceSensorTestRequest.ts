export class DeviceSensorTestRequest
{
  sensorId: number
  deviceId: number
  runtime: number = 5
  startTime: string
  endTime: string | null
}
