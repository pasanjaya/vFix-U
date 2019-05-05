import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


// import { MatCheckboxModule } from '@angular/material';
// import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule, MatBadgeModule, MatIconModule } from '@angular/material';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { GeneralService } from './services/general.service';

import { AuthInterceptor } from './auth/auth-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponentComponent } from './landing-page/layouts/navbar-component/navbar-component.component';
import { IndexComponent } from './landing-page/index/index.component';
import { AdminComponentComponent } from './admin-dashboard/admin-component/admin-component.component';
import { AdminNavbarComponent } from './admin-dashboard/layouts/admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './admin-dashboard/layouts/admin-sidebar/admin-sidebar.component';
import { BuyerComponentComponent } from './buyers-dashboard/buyer-component/buyer-component.component';
import { SellerComponentComponent } from './sellers-dashboard/seller-component/seller-component.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { CarouselComponentComponent } from './landing-page/layouts/carousel-component/carousel-component.component';
import { FooterComponentComponent } from './landing-page/layouts/footer-component/footer-component.component';
import { BuyerNavbarComponentComponent } from './buyers-dashboard/layouts/buyer-navbar-component/buyer-navbar-component.component';
import { BuyerSidebarComponentComponent } from './buyers-dashboard/layouts/buyer-sidebar-component/buyer-sidebar-component.component';
import { BuyerDashboardComponent } from './buyers-dashboard/pages/buyer-dashboard/buyer-dashboard.component';
import { BuyerProfileComponent } from './buyers-dashboard/pages/buyer-profile/buyer-profile.component';
import { SellerSidebarComponent } from './sellers-dashboard/layouts/seller-sidebar/seller-sidebar.component';
import { SellerNavbarComponent } from './sellers-dashboard/layouts/seller-navbar/seller-navbar.component';
import { SellerDashboardComponent } from './sellers-dashboard/pages/seller-dashboard/seller-dashboard.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { SellerProfileComponent } from './sellers-dashboard/pages/seller-profile/seller-profile.component';
import { SellerAdvertiseComponent } from './sellers-dashboard/pages/seller-advertise/seller-advertise.component';
import { LandingNewArraivalsComponent } from './landing-page/landing-components/landing-new-arraivals/landing-new-arraivals.component';
import { LandingTestimonialsComponent } from './landing-page/landing-components/landing-testimonials/landing-testimonials.component';
import { SellerMessagesComponent } from './sellers-dashboard/pages/seller-messages/seller-messages.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponentComponent,
    IndexComponent,
    AdminComponentComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    BuyerComponentComponent,
    SellerComponentComponent,
    NotFoundComponentComponent,
    CarouselComponentComponent,
    FooterComponentComponent,
    BuyerNavbarComponentComponent,
    BuyerSidebarComponentComponent,
    BuyerDashboardComponent,
    BuyerProfileComponent,
    SellerSidebarComponent,
    SellerNavbarComponent,
    SellerDashboardComponent,
    AuthLayoutComponent,
    SellerProfileComponent,
    SellerAdvertiseComponent,
    LandingNewArraivalsComponent,
    LandingTestimonialsComponent,
    SellerMessagesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatBadgeModule,
    MatIconModule,
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    GeneralService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
