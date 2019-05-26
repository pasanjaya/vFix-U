import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../../auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-seller-navbar',
  templateUrl: './seller-navbar.component.html',
  styleUrls: ['./seller-navbar.component.scss']
})
export class SellerNavbarComponent implements OnInit {

  userId = '';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getUserId();
  }

  onLogout() {
    this.authService.userLogout();
  }

  getUserId() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    const decodedToken = helper.decodeToken(token);
    const tokenid = decodedToken.userId;
    this.userId = tokenid;
  }

}
