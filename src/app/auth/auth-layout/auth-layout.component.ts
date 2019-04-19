import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  test: Date = new Date();
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    let html = document.getElementsByTagName('html')[0];
    html.classList.add('auth-layout');
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('bg-default');
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });

  }
  ngOnDestroy() {
    let html = document.getElementsByTagName("html")[0];
    html.classList.remove("auth-layout");
    let body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }

}