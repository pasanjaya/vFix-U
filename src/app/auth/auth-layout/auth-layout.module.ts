import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthLayoutModule { }
