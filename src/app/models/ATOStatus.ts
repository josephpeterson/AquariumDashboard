import { GpioPinValue } from "./types/GpioPinValue";

export class ATOStatus {
  sensorValue: string;
  pumpRunning: boolean;
  maxRuntime: number;
  floatSensorValue: GpioPinValue;
  runtimeRemaining: number;
  runIndefinitely: boolean;
  startTime: string;
  actualEndTime: string;
  estimatedEndTime: string;
  enabled: boolean;
}