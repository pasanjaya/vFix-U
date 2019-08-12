import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  MatExpansionModule,
  MatBadgeModule,
  MatIconModule,
  MatDividerModule,
  MatListModule,
  MatCardModule,
  MatButtonModule,
  MatDialogModule,
  MatStepperModule
} from '@angular/material';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { GeneralService } from './services/general.service';

import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';

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
import { BuyerResponseViewerComponent } from './buyers-dashboard/pages/buyer-response-viewer/buyer-response-viewer.component';
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
import { SellerDashboardCatchitComponent } from './sellers-dashboard/pages/seller-dashboard/seller-dashboard-catchit/seller-dashboard-catchit.component';
import { SellerIncomeComponent } from './sellers-dashboard/pages/seller-income/seller-income.component';
import { BuyerMapComponent } from './buyers-dashboard/pages/buyer-map/buyer-map.component';

import { DeleteConfirmationBoxComponent } from './shared/delete-confirmation-box/delete-confirmation-box.component';
import { ErrorComponent } from './shared/errors/errors.component';
import { SupportComponent } from './support/support.component';
import { BuyerDeliveryOptionComponent } from './buyers-dashboard/pages/buyer-delivery-option/buyer-delivery-option.component';

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
    SellerMessagesComponent,
    SellerDashboardCatchitComponent,
    BuyerResponseViewerComponent,
    DeleteConfirmationBoxComponent,
    SellerIncomeComponent,
    ErrorComponent,
    BuyerMapComponent,
    SupportComponent,
    BuyerDeliveryOptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatBadgeModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    HttpClientModule
  ],
  entryComponents: [
    SellerDashboardCatchitComponent,
    DeleteConfirmationBoxComponent,
    ErrorComponent
  ],
  providers: [
    GeneralService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
