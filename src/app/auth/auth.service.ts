import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { ConsumerData } from './consumer-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private id: string;

  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
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

  userLogin(email: string, password: string) {
    const userLoginData: ConsumerData = { email, password };
    this.http
      .post<{ token: string; role: string; id: string }>(
        'http://localhost:3000/api/user/login',
        userLoginData
      )
      .subscribe(response => {
        console.log(response);
        const id = response.id;
        const role = response.role;
        const token = response.token;
        this.token = token;
        if (token) {
          this.authStatusListener.next(true);
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
}
