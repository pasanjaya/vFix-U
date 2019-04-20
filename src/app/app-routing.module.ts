import { BuyerDashboardComponent } from './buyers-dashboard/pages/buyer-dashboard/buyer-dashboard.component';
import { SellerDashboardComponent } from './sellers-dashboard/pages/seller-dashboard/seller-dashboard.component';
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './landing-page/index/index.component';
import { AdminComponentComponent } from './admin-dashboard/admin-component/admin-component.component';
import { BuyerComponentComponent } from './buyers-dashboard/buyer-component/buyer-component.component';
import { SellerComponentComponent } from './sellers-dashboard/seller-component/seller-component.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
// import { LoginComponent } from './auth/login/login.component';
import { ManageDeatilsComponent } from './buyers-dashboard/pages/manage-deatils/manage-deatils.component';
// import { SignupComponent } from './auth/signup/signup.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { SellerProfileComponent } from './sellers-dashboard/pages/seller-profile/seller-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full'},
  { path: 'index', component: IndexComponent},
  { path: 'admindashboard',
    component: AdminComponentComponent,
    children: [
      { path: '',
        loadChildren: './admin-dashboard/admin-component/admin-component.module#AdminComponentModule'
      }
    ]
  },
  { path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '',
        loadChildren: './auth/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  },
  // buyerdashboard and its pages will routered here
  { path: 'buyerdashboard', component: BuyerComponentComponent, children: [
    { path: ':id', component: BuyerDashboardComponent},
    { path: ':id/managedetails', component: ManageDeatilsComponent},
  ] },
  // sellerdashboard and its pages will routered here
  { path: 'sellerdashboard', component: SellerComponentComponent, children: [
    { path: '', component: SellerDashboardComponent },
    { path: 'sellerprofile', component: SellerProfileComponent }
  ] },
  // wild card routing will direct to this component
  { path: '**', component: NotFoundComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
