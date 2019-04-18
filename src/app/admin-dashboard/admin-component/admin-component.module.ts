import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponentRoutingModule } from './admin-component-routing.module';
import { AdminMapsComponent } from './../pages/admin-maps/admin-maps.component';
import { AdminLoginComponent } from './../pages/admin-login/admin-login.component';
import { AdminDashboardComponent } from './../pages/admin-dashboard/admin-dashboard.component';
import { AdminConfigurationComponent } from '../pages/admin-configuration/admin-configuration.component';


@NgModule({
  declarations: [
    AdminMapsComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminConfigurationComponent
  ],
  imports: [
    CommonModule,
    AdminComponentRoutingModule
  ]
})
export class AdminComponentModule { }
