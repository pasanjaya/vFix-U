import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('login') loginForm: NgForm;
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.loginForm);
  }

}
