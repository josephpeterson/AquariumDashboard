import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public authorized: boolean = this.auth.isAuthenticated();
  
  constructor(private auth:AuthService,private router: Router) {

  }
  ngOnInit() {
    if(this.auth.isAuthenticated()) {
      //var userid = this.auth.getUser().id;
      this.router.navigate(["dashboard"]);
      console.log("hasdasd");
    }
  }
}

