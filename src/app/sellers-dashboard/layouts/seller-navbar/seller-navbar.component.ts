import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../../auth/auth.service';

@Component({
  selector: 'app-seller-navbar',
  templateUrl: './seller-navbar.component.html',
  styleUrls: ['./seller-navbar.component.scss']
})
export class SellerNavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogout() {
    this.authService.userLogout();
  }

}
