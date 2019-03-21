import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buyer-sidebar-component',
  templateUrl: './buyer-sidebar-component.component.html',
  styleUrls: ['./buyer-sidebar-component.component.scss']
})
export class BuyerSidebarComponentComponent implements OnInit {
  public isCollapsed = true;
  constructor() { }

  collapse() {
    this.isCollapsed = this.isCollapsed ? !this.isCollapsed : this.isCollapsed;
  }

  ngOnInit() {
  }

}
