import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponentComponent } from './landing-page/layouts/navbar-component/navbar-component.component';
import { IndexComponent } from './landing-page/index/index.component';
import { AdminComponentComponent } from './admin-dashboard/admin-component/admin-component.component';
import { BuyerComponentComponent } from './buyers-dashboard/buyer-component/buyer-component.component';
import { SellerComponentComponent } from './sellers-dashboard/seller-component/seller-component.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { ManageDeatilsComponent } from './buyers-dashboard/pages/manage-deatils/manage-deatils.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full'},
  { path: 'index', component: IndexComponent},
  { path: 'admindashboard', component: AdminComponentComponent },
  { path: 'buyerdashboard', component: BuyerComponentComponent },
  { path: 'sellerdashboard', component: SellerComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'managedetails', component: ManageDeatilsComponent},
  { path: '**', component: NotFoundComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
