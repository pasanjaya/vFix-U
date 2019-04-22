import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from './../../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.scss']
})
export class NavbarComponentComponent implements OnInit, OnDestroy {

  public title = 'vFix-U';
  public isCollapsed = true;

  userIsAuthenticated = false;
  private authListenerSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService.getAuthStatusLintener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

  onLogout() {
    this.authService.userLogout();
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
