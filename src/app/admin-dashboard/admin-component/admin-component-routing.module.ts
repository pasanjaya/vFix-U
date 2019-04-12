import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminMapsComponent } from './../pages/admin-maps/admin-maps.component';
import { AdminLoginComponent } from './../pages/admin-login/admin-login.component';
import { AdminDashboardComponent } from './../pages/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'login', component: AdminLoginComponent },
  { path: 'track', component: AdminMapsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminComponentRoutingModule { }
