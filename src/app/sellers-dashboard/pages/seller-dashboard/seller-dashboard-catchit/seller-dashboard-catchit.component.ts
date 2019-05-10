import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-seller-dashboard-catchit',
  templateUrl: './seller-dashboard-catchit.component.html',
  styleUrls: ['./seller-dashboard-catchit.component.scss']
})
export class SellerDashboardCatchitComponent implements OnInit {
  title: string;
  closeBtnName: string;
  list: any[] = [];

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.list.push('PROFIT!!!');
  }

}
