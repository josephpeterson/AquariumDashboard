import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { AquariumAccount } from 'src/app/models/AquariumAccount';
import { AuthService } from 'src/app/services/auth.service';
import { getAuthenticatedUser } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  public sidebarOpened: boolean = true;

  public user$ = this.store.select(getAuthenticatedUser);

  constructor(private auth: AuthService,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.auth.getUser();
  }
}
