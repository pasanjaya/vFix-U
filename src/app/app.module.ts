import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// import { MatCheckboxModule } from '@angular/material';
// import { MatToolbarModule } from '@angular/material/toolbar';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';
// import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponentComponent } from './landing-page/layouts/navbar-component/navbar-component.component';
import { IndexComponent } from './landing-page/index/index.component';
import { AdminComponentComponent } from './admin-dashboard/admin-component/admin-component.component';
import { BuyerComponentComponent } from './buyers-dashboard/buyer-component/buyer-component.component';
import { SellerComponentComponent } from './sellers-dashboard/seller-component/seller-component.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { CarouselComponentComponent } from './landing-page/layouts/carousel-component/carousel-component.component';
import { FooterComponentComponent } from './landing-page/layouts/footer-component/footer-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { BuyerNavbarComponentComponent } from './buyers-dashboard/layouts/buyer-navbar-component/buyer-navbar-component.component';
import { BuyerSidebarComponentComponent } from './buyers-dashboard/layouts/buyer-sidebar-component/buyer-sidebar-component.component';
import { DashboardComponentComponent } from './buyers-dashboard/pages/dashboard-component/dashboard-component.component';
import { ManageDeatilsComponent } from './buyers-dashboard/pages/manage-deatils/manage-deatils.component';
import { AdminDashboardComponent } from './admin-dashboard/pages/admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './admin-dashboard/layouts/admin-navbar/admin-navbar.component';
import { AdminLoginComponent } from './admin-dashboard/pages/admin-login/admin-login.component';
import { AdminSidebarComponent } from './admin-dashboard/layouts/admin-sidebar/admin-sidebar.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponentComponent,
    IndexComponent,
    AdminComponentComponent,
    BuyerComponentComponent,
    SellerComponentComponent,
    NotFoundComponentComponent,
    CarouselComponentComponent,
    FooterComponentComponent,
    LoginComponentComponent,
    BuyerNavbarComponentComponent,
    BuyerSidebarComponentComponent,
    DashboardComponentComponent,
    ManageDeatilsComponent,
    AdminDashboardComponent,
    AdminNavbarComponent,
    AdminLoginComponent,
    AdminSidebarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // MatCheckboxModule,
    // MatToolbarModule,
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    // ButtonsModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
