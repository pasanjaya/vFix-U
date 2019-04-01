import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buyer-navbar-component',
  templateUrl: './buyer-navbar-component.component.html',
  styleUrls: ['./buyer-navbar-component.component.scss']
})
export class BuyerNavbarComponentComponent implements OnInit {
  title = 'Buyer-dashBoard';
  constructor() { }

  getTitle() {
    return this.title;
  }

  ngOnInit() {
  }

}
