export enum AquariumApiEndpoints {
  //AdministrativeController
  ADMIN_RETRIEVE_ACCOUNTS = "/v1/admin/Users",
  ADMIN_RETRIEVE_BUGS = "/v1/admin/Bugs",
  ADMIN_RETRIEVE_NOTIFICATIONS = "/v1/admin/Notifications",
  ADMIN_NOTIFICATION_DISPATCH = "/v1/admin/Notification",
  ADMIN_NOTIFICATION_DISMISS = "/v1/admin/Notification/Dismiss",
  ADMIN_NOTIFICATION_DELETE_ALL = "/v1/admin/Notification/Delete",

  //AccountController
  ACCOUNT_GET_DETAILED = "/v1/Account/{id}", //not used
  ACCOUNT_GET_CLAIMS = "/v1/Account/Claims", //not used
  ACCOUNT_GET_CURRENT = "/v1/Account/Current",
  ACCOUNT_RETRIEVE_NOTIFICATIONS = "/v1/Account/Notifications",
  ACCOUNT_NOTIFICATION_DISMISS = "/v1/Account/Notifications/Dismiss",
  ACCOUNT_UPDATE = "/v1/Account/Update", //not used

  //Activity Controller
  ACCOUNT_RETRIEVE_ACTIVITY = "/v1/Activity/{activityId}",

  //DeviceController
  DEVICE_RETRIEVE = "/v1/Device/{deviceId}",
  DEVICE_DELETE = "/v1/Device/{deviceId}/Delete",
  DEVICE_UPDATE = "/v1/Device/Update",
  DEVICE_CREATE = "/v1/Device/Add",
  DEVICE_DISPATCH_SCAN = "/v1/Device/{deviceId}/Scan",
  DEVICE_DISPATCH_PING = "/v1/Device/{deviceId}/Ping",
  DEVICE_DISPATCH_AUTH_RENEW = "/v1/Device/{deviceId}/Renew",
  DEVICE_DISPATCH_SNAPSHOT_CONFIGURATION = "/v1/Device/{deviceId}/CameraConfiguration",
  DEVICE_LOG = "/v1/Device/{deviceId}/Log",
  DEVICE_LOG_CLEAR = "/v1/Device/{deviceId}/Log/Clear",
  DEVICE_RETRIEVE_DETAILED = "/v1/Device/{deviceId}/Information",
  DEVICE_UPDATE_CONFIGURATION = "/v1/Device/{deviceId}/UpdateConfigurationFile",
  DEVICE_SENSORS = "/v1/Device/{deviceId}/Sensors",
  DEVICE_SENSOR_CREATE = "/v1/Device/{deviceId}/Sensor/Create",
  DEVICE_SENSOR_DELETE = "/v1/Device/{deviceId}/Sensor/Remove",
  DEVICE_SENSOR_UPDATE = "/v1/Device/{deviceId}/Sensor/Update",
  DEVICE_SENSOR_TEST = "/v1/Device/{deviceId}/Sensor/Test",
  DEVICE_SCHEDULE_DEPLOY = "/v1/Device/{deviceId}/DeploySchedule/{scheduleId}",
  DEVICE_SCHEDULE_STATUS = "/v1/Device/{deviceId}/Schedule/Status",
  DEVICE_DISPATCH_TASK = "/v1/Device/{deviceId}/Schedule/PerformTask",
  DEVICE_TASK_CREATE = "/v1/Device/{deviceId}/Task/Create",
  DEVICE_TASK_UPDATE = "/v1/Device/{deviceId}/Task/Update",
  DEVICE_TASK_DELETE = "/v1/Device/{deviceId}/Task/{taskId}/Delete",


  //AquariumController
  AQUARIUM_RETRIEVE_ALL = "/v1/Aquarium/All",
  AQUARIUM_RETRIEVE_DETAILED = "/v1/Aquarium/{id}",
  AQUARIUM_CREATE = "/v1/Aquarium/Add",
  AQUARIUM_UPDATE = "/v1/Aquarium/Update",
  AQUARIUM_DELETE = "/v1/Aquarium/Delete",
  AQUARIUM_RETRIEVE_TEMPERATURE = "/v1/Aquarium/TemperatureHistogram",
  AQUARIUM_RETRIEVE_TEMPERATURE_ALL = "/v1/Aquarium/TemperatureHistogram/All",
  AQUARIUM_RETRIEVE_SNAPSHOTS = "/v1/Aquarium/{aquariumId}/Snapshots",
  AQUARIUM_DELETE_SNAPSHOTS = "/v1/Aquarium/{aquariumId}/Snapshots",

  //WaterController
  AQUARIUM_WATER_RETRIEVE_WATERCHANGES = "/v1/Aquarium/{aquariumId}/Water/WaterChanges",
  AQUARIUM_WATER_RETRIEVE_AUTOWATERCHANGES = "/v1/Aquarium/{aquariumId}/Water/AutoWaterChanges",
  AQUARIUM_WATER_UPSERT_WATERCHANGE = "/v1/Aquarium/{aquariumId}/Water/WaterChanges",
  AQUARIUM_WATER_DELETE_WATERCHANGES = "/v1/Aquarium/{aquariumId}/Water/WaterChanges",
  AQUARIUM_WATER_RETRIEVE_WATERATOS = "/v1/Aquarium/{aquariumId}/Water/WaterATOs",
  AQUARIUM_WATER_RETRIEVE_AUTOWATERATOS = "/v1/Aquarium/{aquariumId}/Water/AutoWaterATOs",
  AQUARIUM_WATER_UPSERT_WATERATO = "/v1/Aquarium/{aquariumId}/Water/WaterATOs",
  AQUARIUM_WATER_DELETE_WATERATOS = "/v1/Aquarium/{aquariumId}/Water/WaterATOs",

  //AuthController
  AUTH_RENEW = "/v1/Auth/Renew",
  AUTH_LOGIN = "/v1/Auth/Login",
  AUTH_LOGIN_DEVICE = "/v1/Auth/Login/Device",
  AUTH_SIGNUP = "/v1/Auth/Signup",
  AUTH_PASSWORD_RESET = "/v1/Auth/PasswordReset/Attempt",
  AUTH_PASSWORD_RESET_UPGRADE = "/v1/Auth/PasswordReset/Upgrade",
  AUTH_PASSWORD_RESET_SUBMIT = "/v1/Auth/PasswordReset/Submit",

  //BugController
  BUG_SUBMIT = "/v1/Bug/Submit",

  //DeviceATOController
  DEVICE_ATO_STATUS = "/v1/Device/{deviceId}/ATO",
  DEVICE_ATO_HISTORY = "/v1/Device/{deviceId}/ATO/History",
  DEVICE_ATO_RUN = "/v1/Device/{deviceId}/ATO",
  DEVICE_ATO_STOP = "/v1/Device/{deviceId}/ATO/Stop",

  //DeviceScheduleController
  SCHEDULE_CREATE = "/v1/Device/{deviceId}/Schedule/Create",
  SCHEDULE_RETRIEVE = "/v1/Schedule",
  SCHEDULE_RETRIEVE_TASKTYPES = "/v1/Schedule/Tasks",
  SCHEDULE_RETRIEVE_SCHEDULED_JOBS = "/v1/Device/{deviceId}/Schedule/Jobs",
  SCHEDULE_DELETE = "/v1/Device/{deviceId}/Schedule/{scheduleId}/Delete",
  SCHEDULE_UPDATE = "/v1/Schedule/Update",
  SCHEDULE_SCHEDULED_JOB_STOP = "/v1/Device/{deviceId}/Schedule/Job/Stop",
  SCHEDULE_RETRIEVE_SCHEDULED_JOBS_ON_DEVICE = "/v1/Device/{deviceId}/Schedule/Job/Deployed",

}
declare global {
  interface String {
    aggregate(...params): string;
  }
}

String.prototype.aggregate = function (...params: string[]) {
  var str = String(this);
  var paramsToReplace = str.match(/(?<=\{).+?(?=\})/g);
  paramsToReplace.forEach((p, i) => {
    str = str.replace(new RegExp(`{${p}}`, 'g'), params[i]);
  });
  return str;
};