import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { IndexComponent } from './landing-page/index/index.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { AdminComponentComponent } from './admin-dashboard/admin-component/admin-component.component';
import { BuyerComponentComponent } from './buyers-dashboard/buyer-component/buyer-component.component';
import { BuyerProfileComponent } from './buyers-dashboard/pages/buyer-profile/buyer-profile.component';
import { BuyerDashboardComponent } from './buyers-dashboard/pages/buyer-dashboard/buyer-dashboard.component';
import { BuyerResponseViewerComponent } from './buyers-dashboard/pages/buyer-response-viewer/buyer-response-viewer.component';
import { SellerComponentComponent } from './sellers-dashboard/seller-component/seller-component.component';
import { SellerDashboardComponent } from './sellers-dashboard/pages/seller-dashboard/seller-dashboard.component';
import { SellerProfileComponent } from './sellers-dashboard/pages/seller-profile/seller-profile.component';
import { SellerAdvertiseComponent } from './sellers-dashboard/pages/seller-advertise/seller-advertise.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { SellerMessagesComponent } from './sellers-dashboard/pages/seller-messages/seller-messages.component';
import { SellerIncomeComponent } from './sellers-dashboard/pages/seller-income/seller-income.component';
import { BuyerMapComponent } from './buyers-dashboard/pages/buyer-map/buyer-map.component';
import { SupportComponent } from './support/support.component';
import { BuyerDeliveryOptionComponent } from './buyers-dashboard/pages/buyer-delivery-option/buyer-delivery-option.component';

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
    { path: '', component: BuyerDashboardComponent },
    { path: 'response', component: BuyerResponseViewerComponent },
    { path: 'response/order', component: BuyerDeliveryOptionComponent },
    { path: 'buyerprofile', component: BuyerProfileComponent },
    { path: 'buyertracker', component: BuyerMapComponent },
    { path: 'support', component: SupportComponent }
  ] },
  // sellerdashboard and its pages will routered here
  { path: 'sellerdashboard/:id', component: SellerComponentComponent, canActivate: [AuthGuard], children: [
    { path: '', component: SellerDashboardComponent },
    { path: 'sellerprofile', component: SellerProfileComponent },
    { path: 'selleradvertise', component: SellerAdvertiseComponent},
    { path: 'sellermessages', component: SellerMessagesComponent},
    { path: 'sellerincome', component: SellerIncomeComponent},
    { path: 'support', component: SupportComponent }
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
