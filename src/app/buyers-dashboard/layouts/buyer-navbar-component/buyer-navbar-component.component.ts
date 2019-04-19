import { AuthService } from './../../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buyer-navbar-component',
  templateUrl: './buyer-navbar-component.component.html',
  styleUrls: ['./buyer-navbar-component.component.scss']
})
export class BuyerNavbarComponentComponent implements OnInit {
  title = 'Buyer-dashBoard';

  constructor(private authServie: AuthService) { }

  getTitle() {
    return this.title;
  }

  ngOnInit() {
  }

  onLogout() {
    this.authServie.userLogout();
  }

}
