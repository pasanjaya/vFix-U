import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from './../../../auth/auth.service';

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

  constructor(private authService: AuthService, private router: Router) { }

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

  onClickDashboard() {
    const role = this.authService.getRole();
    const id = this.authService.getUserId();
    if (role === 'consumer') {
      this.router.navigate(['/buyerdashboard', id]);
    } else if (role === 'merchant') {
      this.router.navigate(['/sellerdashboard', id]);
    } else {
      console.log('role error occured at navbar component');
    }
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
