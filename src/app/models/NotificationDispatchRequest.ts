import { DispatchedNotification } from './DispatchedNotification'

export class NotificationDispatchRequest
{
  accountIds: number[] | null
  notification: DispatchedNotification
}
