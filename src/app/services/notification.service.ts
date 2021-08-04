import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';


@Injectable({
  providedIn: "root"
})
export class NotificationService {
  public aquariumId: number;

  constructor(private notifier: NotifierService) {
    
  }

  public notify(level:string,body:string) {
    if(this.notifier)
      this.notifier.notify(level,body);
    else
    {
      console.warn(level,body);
    }
  }
}