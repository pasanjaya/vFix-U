import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-buyer-sidebar-component',
  templateUrl: './buyer-sidebar-component.component.html',
  styleUrls: ['./buyer-sidebar-component.component.scss']
})
export class BuyerSidebarComponentComponent implements OnInit {
  menuItems = [];
  public isCollapsed = true;

  userId = '';

  constructor() { }

  collapse() {
    this.isCollapsed = this.isCollapsed ? !this.isCollapsed : this.isCollapsed;
  }

  ngOnInit() {
    this.getUserId();
  }

  getUserId() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    const decodedToken = helper.decodeToken(token);
    const tokenid = decodedToken.userId;
    this.userId = tokenid;
  }


}
