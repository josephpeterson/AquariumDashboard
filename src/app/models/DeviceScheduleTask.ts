import * as moment from "moment"

export class DeviceScheduleTask {
  id: number //= Math.floor(Math.random() * 100);
  scheduleId: number
  startTime: any | null
  endTime: any | null
  interval: number | null = 30
  taskId: number

  static getTaskNameFromId(taskId: number) {
    var types = DeviceScheduleTaskTypes;
    for (var name in types) {
      if (DeviceScheduleTaskTypes[name] == `${taskId}`)
        return name;
    }
    return DeviceScheduleTaskTypes.Unknown;
  }
  static getETAForTask(task: DeviceScheduleTask) {
    var d = moment(task.startTime).diff(moment());
    return moment.duration(d).humanize();
  }
}
export enum DeviceScheduleTaskTypes {
  Unknown = 0,
  Snapshot = 1,
  StartATO = 2,
}