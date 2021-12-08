import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AquariumService } from 'src/app/services/aquarium.service';

@Component({
  selector: 'home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.scss']
})
export class HomeNavComponent  {
  constructor(private auth: AuthService, private router: Router, private aquariumService: AquariumService) {

  }
}

