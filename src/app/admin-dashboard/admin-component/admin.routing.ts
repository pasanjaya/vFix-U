import { AdminLoginComponent } from './../pages/admin-login/admin-login.component';
import { AdminMapsComponent } from './../pages/admin-maps/admin-maps.component';
import { Routes } from '@angular/router';

import { AdminDashboardComponent } from '../pages/admin-dashboard/admin-dashboard.component';


export const AdminRoutes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'login', component: AdminLoginComponent },
  { path: 'track', component: AdminMapsComponent }
];
