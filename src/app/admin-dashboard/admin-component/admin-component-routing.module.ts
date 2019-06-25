import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminMapsComponent } from './../pages/admin-maps/admin-maps.component';
import { AdminLoginComponent } from './../pages/admin-login/admin-login.component';
import { AdminDashboardComponent } from './../pages/admin-dashboard/admin-dashboard.component';
import { AdminConfigurationComponent } from '../pages/admin-configuration/admin-configuration.component';
import { AdminDatabaseComponent } from '../pages/admin-database/admin-database.component';
import { AdminAdvertisementsComponent } from '../pages/admin-advertisements/admin-advertisements.component';
import { AdminMailComponent } from '../pages/admin-mail/admin-mail.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'login', component: AdminLoginComponent },
  { path: 'track', component: AdminMapsComponent },
  { path: 'mail', component: AdminMailComponent },
  { path: 'configure', component: AdminConfigurationComponent},
  { path: 'database', component: AdminDatabaseComponent },
  { path: 'advertisements', component: AdminAdvertisementsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminComponentRoutingModule { }
