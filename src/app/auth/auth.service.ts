import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import { ConsumerData } from './consumer-data.model';
import { MerchantData } from './merchant-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private role: string;
  private id: string;
  private isAuthenticated = false;
  private tokenTimer: NodeJS.Timer;

  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.id;
  }

  getRole() {
    return this.role;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusLintener() {
    return this.authStatusListener.asObservable();
  }

  createConsumer(
    fullName: string,
    email: string,
    mobileNumber: number,
    password: string
  ) {
    const role = 'consumer';
    const consumerData: ConsumerData = {
      fullName,
      email,
      mobileNumber,
      password,
      role
    };
    this.http
      .post('http://localhost:3000/api/consumer/register', consumerData)
      .subscribe(response => {
        console.log(response);
      });
  }

  // Merchant services -----------------------------

  createMerchant(
    fullName: string,
    email: string,
    mobileNumber: number,
    password: string
  ) {
    const role = 'merchant';
    const merchantData: MerchantData = {
      fullName,
      email,
      mobileNumber,
      password,
      role
    };
    this.http
      .post('http://localhost:3000/api/merchant/register', merchantData)
      .subscribe(response => {
        console.log(response);
      });
  }

  userLogin(email: string, password: string) {
    const helper = new JwtHelperService();
    const userLoginData: ConsumerData = { email, password };
    this.http
      .post<{ token: string; role: string; id: string, expiresIn: number }>(
        'http://localhost:3000/api/user/login',
        userLoginData
      )
      .subscribe(response => {
        console.log(response);
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn ;
          this.setAuthTimer(expiresInDuration);
          const decodedToken = helper.decodeToken(token);
          const id = decodedToken.userId;
          const role = decodedToken.userRole;
          this.id = id;
          this.role = role;
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate);
          if (role === 'consumer') {
            this.router.navigate(['/buyerdashboard', id]);
          } else if (role === 'merchant') {
            this.router.navigate(['/sellerdashboard', id]);
          } else {
            console.log('role error occured at auth service');
          }
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const helper = new JwtHelperService();
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() -  now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      const decodedToken = helper.decodeToken(this.token);
      this.role = decodedToken.userRole;
      this.id = decodedToken.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
    }
  }

  userLogout() {
    this.token = null;
    this.id = null;
    this.role = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.userLogout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    };
  }

}
