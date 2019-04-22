import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { IndexComponent } from './landing-page/index/index.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { AdminComponentComponent } from './admin-dashboard/admin-component/admin-component.component';
import { BuyerComponentComponent } from './buyers-dashboard/buyer-component/buyer-component.component';
import { ManageDeatilsComponent } from './buyers-dashboard/pages/manage-deatils/manage-deatils.component';
import { BuyerDashboardComponent } from './buyers-dashboard/pages/buyer-dashboard/buyer-dashboard.component';
import { SellerComponentComponent } from './sellers-dashboard/seller-component/seller-component.component';
import { SellerDashboardComponent } from './sellers-dashboard/pages/seller-dashboard/seller-dashboard.component';
import { SellerProfileComponent } from './sellers-dashboard/pages/seller-profile/seller-profile.component';
import { SellerAdvertiseComponent } from './sellers-dashboard/pages/seller-advertise/seller-advertise.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';

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
  { path: 'buyerdashboard/:id', component: BuyerComponentComponent, canActivate: [AuthGuard], children: [
    { path: '', component: BuyerDashboardComponent},
    { path: 'managedetails', component: ManageDeatilsComponent},
  ] },
  // sellerdashboard and its pages will routered here
  { path: 'sellerdashboard/:id', component: SellerComponentComponent, canActivate: [AuthGuard], children: [
    { path: '', component: SellerDashboardComponent },
    { path: 'sellerprofile', component: SellerProfileComponent },
    { path: 'selleradvertise', component: SellerAdvertiseComponent}
  ] },
  // wild card routing will direct to this component
  { path: '**', component: NotFoundComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
