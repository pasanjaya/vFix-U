import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../signup/signup.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  private authStatusSub: Subscription;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusLintener()
    .subscribe( authStatus => {
      this.isLoading = false;
    });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.userLogin(form.value.email, form.value.password);
    form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
