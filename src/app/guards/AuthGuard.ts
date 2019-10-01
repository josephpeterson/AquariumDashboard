import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,private router: Router) {}

  canActivate() {
      if(this.authService.isAuthenticated())
      {
          return true;
      }
      else
      {
        this.authService.clearToken();
        this.router.navigateByUrl("/");
        return false;
      } 
  }
}