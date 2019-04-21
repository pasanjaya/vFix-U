import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  constructor(private http: HttpClient) {}

  getUserCount() {
    return this.http.get<{ consumer: number, merchant: number }>('http://localhost:3000/api/user/usercount');
  }

}
