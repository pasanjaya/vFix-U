import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.scss']
})
export class NavbarComponentComponent implements OnInit {

  public title = 'vFix-U';
  public isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

  getTitle() {
    return this.title;
  }

  sidebarToggle() {

  }

  collapse() {
    this.isCollapsed = this.isCollapsed ? !this.isCollapsed : this.isCollapsed;
  }
}
