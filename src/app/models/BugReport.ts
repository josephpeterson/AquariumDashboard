export class BugReport
{
  id: number //= Math.floor(Math.random() * 100);
  impactedUserId: number
  body: string
  title: string
  urlLocation: string
  date: Date
  logFile: string
  type: string
}
