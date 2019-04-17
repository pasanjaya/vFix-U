import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConsumerData } from './consumer-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  createConsumer(fullName: string, email: string, mobileNumber: number, password: string) {
    const consumerData: ConsumerData = { fullName: fullName, email: email, mobileNumber: mobileNumber, password: password };
    this.http.post('http://localhost:3000/api/consumer/register', consumerData)
    .subscribe(response => {
      console.log(response);
    });
  }
}
