import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-income',
  templateUrl: './seller-income.component.html',
  styleUrls: ['./seller-income.component.scss']
})
export class SellerIncomeComponent implements OnInit {

  now: Date  = new Date();

  constructor() {
    setInterval(() => {
      this.now = new Date();
    }, 1);
   }

  ngOnInit() {
  }

}
