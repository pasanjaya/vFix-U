import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { MerchantProfile } from '../pages/seller-profile/merchant-profile.model';
import { Merchant } from '../pages/seller-profile/merchant.model';

@Injectable({
  providedIn: 'root'
})
export class SellerProfileService {

  private userData: Merchant[] = [];
  private userDataUpdated = new Subject<Merchant[]>();

  constructor(private http: HttpClient) {}

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
      .post('http://localhost:3000/api/profile/merchant/save', merchantProfile)
      .subscribe(response => {
        console.log(response);
      });
  }

  getUser() {
    this.http.get<{message: string, result: any }>('http://localhost:3000/api/profile/merchant/user')
    .pipe(
      map(userdata => {
        return userdata.result.map(
          user => {
            return {
              id: user._id,
              fullName: user.fullName,
              email: user.email,
              mobileNumber: user.mobileNumber,
              profile: user.profile
            };
          }
        );
      })
    )
    .subscribe(transformedUser => {
      this.userData = transformedUser;
      this.userDataUpdated.next([...this.userData]);
      console.log(transformedUser);
    });
  }

  getuserDataUpdatedListener() {
    return this.userDataUpdated.asObservable();
  }

  getProfile() {
    this.http.get<{message: string, result: any }>('http://localhost:3000/api/profile/merchant/retrive')
      .pipe(
        map(result => {
        return result.result.map(
          userProfile => {
          return {
            id: userProfile._id,
            fullName: userProfile.fullName,
            email: userProfile.email,
            mobileNumber: userProfile.mobileNumber
          };
        });
      }))
      .subscribe( transformedResult => {
        console.log(transformedResult);
    });
  }

}