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
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getAuthStatusLintener() {
    return this.authStatusListener.asObservable();
  }

  createConsumer(fullName: string, email: string, mobileNumber: number, password: string) {
    const consumerData: ConsumerData = { fullName: fullName, email: email, mobileNumber: mobileNumber, password: password };
    this.http.post('http://localhost:3000/api/consumer/register', consumerData)
    .subscribe(response => {
      console.log(response);
    });
  }

  consumerLogin(email: string, password: string) {
    const consumerData: ConsumerData = { email: email, password: password };
    this.http.post<{token: string}>('http://localhost:3000/api/consumer/login', consumerData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          this.authStatusListener.next(true);
          this.router.navigate(['/buyerdashboard']);
        }
      });
  }
}
