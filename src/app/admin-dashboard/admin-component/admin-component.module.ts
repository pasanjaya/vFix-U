import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AdminComponentRoutingModule } from './admin-component-routing.module';
import { AdminMapsComponent } from './../pages/admin-maps/admin-maps.component';
import { AdminLoginComponent } from './../pages/admin-login/admin-login.component';
import { AdminDashboardComponent } from './../pages/admin-dashboard/admin-dashboard.component';
import { AdminConfigurationComponent } from '../pages/admin-configuration/admin-configuration.component';
import { AdminDatabaseComponent } from '../pages/admin-database/admin-database.component';
import { AdminAdvertisementsComponent } from '../pages/admin-advertisements/admin-advertisements.component';
import { AdminMailComponent } from '../pages/admin-mail/admin-mail.component';


@NgModule({
  declarations: [
    AdminMapsComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminConfigurationComponent,
    AdminDatabaseComponent,
    AdminAdvertisementsComponent,
    AdminMailComponent
  ],
  imports: [
    CommonModule,
    AdminComponentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot()
  ]
})
export class AdminComponentModule { }
