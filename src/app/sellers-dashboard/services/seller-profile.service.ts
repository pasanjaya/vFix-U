import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MerchantProfile } from '../pages/seller-profile/merchant-profile.model';

@Injectable({
  providedIn: 'root'
})
export class SellerProfileService {

  constructor(private http: HttpClient, private router: Router) {}

  saveProfile(
    shopName: string,
    shopReg: string,
    address: string,
    city: string,
    contactNo: string,
    latitude: string,
    longitude: string,
    about: string
  ) {
    const merchantProfile: MerchantProfile = {
      shopName,
      shopReg,
      address,
      city,
      contactNo,
      latitude,
      longitude,
      about
    };
    this.http
      .post<{message: string, result: any }>('http://localhost:3000/api/profile/merchant/save', merchantProfile)
      .subscribe(response => {
        if (response) {
          const id = response.result[1]._id;
          this.router.navigate(['/sellerdashboard', id]);
        }
        console.log(response);
      });
  }

  getUser(): Observable<any> {
    return this.http.get<{message: string, result: any }>('http://localhost:3000/api/profile/merchant/user');
  }

  getProfile(): Observable<any> {
    return this.http.get<{message: string, result: any }>('http://localhost:3000/api/profile/merchant/retrive');
  }

  updateProfile(
    id: string,
    shopName: string,
    shopReg: string,
    address: string,
    city: string,
    contactNo: string,
    latitude: string,
    longitude: string,
    about: string
  ) {
    const merchantProfile: MerchantProfile = {
      id,
      shopName,
      shopReg,
      address,
      city,
      contactNo,
      latitude,
      longitude,
      about
    };
    this.http.put('http://localhost:3000/api/profile/merchant/update/' + id, merchantProfile)
    .subscribe(response => {
      console.log(response);
      if (response) {
        this.router.navigate(['/sellerdashboard', id]);
      }
    });
  }

}



// fullName: "Isuru Banadaranayake"
// mobileNumber: 716361982
// password: "$2b$10$yCMgi9SjBOuC0NNYuEHMeOW62ngq5hA.eZHbHahbq4PF.MbDvKayC"
// profile:
//     about: null
//     address: "27,nawala road,kotte"
//     city: "Colombo"
//     contactNo: "0112345678"
//     created_at: "2019-05-24T15:58:24.140Z"
//     latitude: "7.8731"
//     longitude: "80.7718"
//     merchantId: "5cd5cced7316f51710fba853"
//     modified_at: "2019-05-24T15:58:24.140Z"
//     shopName: "IAB dealers"
//     shopReg: "19950527"
//     __v: 0
//     _id: "5ce81670a76935088a6de6ca"
//     __proto__: Object
// __v: 0
// _id: "5cd5cced7316f51710fba853"
