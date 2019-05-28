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

  private userRole: string;
  private userId: string;

  userIsAuthenticated = false;
  private authListenerSub: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userRole = this.authService.getRole();
    this.userId = this.authService.getUserId();
    this.authListenerSub = this.authService.getAuthStatusLintener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userRole = this.authService.getRole();
        this.userId = this.authService.getUserId();
      });
  }

  onClickDashboard() {
    if (this.userRole === 'consumer') {
      this.router.navigate(['/buyerdashboard', this.userId]);
    } else if (this.userRole === 'merchant') {
      this.router.navigate(['/sellerdashboard', this.userId]);
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

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }
}
