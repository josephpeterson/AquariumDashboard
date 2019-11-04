import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AquariumService } from 'src/app/services/aquarium.service';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public authorized: boolean = this.auth.isAuthenticated();
  public ready: boolean = false;

  constructor(private auth: AuthService, private router: Router, private aquariumService: AquariumService) {

  }
  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      //Are we authorized
      this.aquariumService.getCurrentUser().subscribe(data => {
        this.router.navigate(["dashboard"]);
        this.ready = true;
      }, err => {
        this.ready = true;
      });
    }
    else
      this.ready = true;
  }
}

