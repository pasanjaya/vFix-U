import { GeneralService } from './../../../services/general.service';
import { Component, OnInit } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-seller-sidebar',
  templateUrl: './seller-sidebar.component.html',
  styleUrls: ['./seller-sidebar.component.scss']
})
export class SellerSidebarComponent implements OnInit {
  public title: string;
  isCollapsed = false;
  userId = '';
  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.title = this.generalService.getTitle();
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
