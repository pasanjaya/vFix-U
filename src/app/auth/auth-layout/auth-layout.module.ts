import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { ConsumersComponent } from '../signup/consumers/consumers.component';
import { MerchantsComponent } from '../signup/merchants/merchants.component';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    ConsumersComponent,
    MerchantsComponent
  ],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthLayoutModule { }
