import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SellerProfileService } from '../../services/seller-profile.service';

import { Merchant } from './merchant.model';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.scss']
})
export class SellerProfileComponent implements OnInit {

  profile: any;
  hasProfile = false;
  firstName = '';
  userName = '';
  profileForm: FormGroup;
  private profileMode = false;
  userData: Merchant[] = [];

  constructor(private sellerProfileService: SellerProfileService) {}

  ngOnInit() {

    this.sellerProfileService.getUser().subscribe(user => {
      if (user.result.profile) {
        this.hasProfile = true;
      }
      this.userName = user.result.fullName;
      this.firstName = this.userName.split(' ')[0];
    });

    this.profileForm = new FormGroup({
      mode: new FormControl(false, Validators.required),
      shopName: new FormControl(null, Validators.required),
      shopReg: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      city: new FormControl('Colombo', Validators.required),
      contactNo: new FormControl(null, Validators.required),
      latitude: new FormControl(7.8731, Validators.required),
      longitude: new FormControl(80.7718, Validators.required),
      about: new FormControl(null)
    });
  }

  get mode() {
    return this.profileForm.get('mode');
  }

  get shopName() {
    return this.profileForm.get('shopName');
  }
  get shopReg() {
    return this.profileForm.get('shopReg');
  }

  get address() {
    return this.profileForm.get('address');
  }

  get city() {
    return this.profileForm.get('city');
  }

  get cantactNo() {
    return this.profileForm.get('contactNo');
  }

  get latitude() {
    return this.profileForm.get('latitude');
  }

  get longitude() {
    return this.profileForm.get('longitude');
  }

  get about() {
    return this.profileForm.get('about');
  }

  onSave() {
    if (this.profileForm.invalid) {
      console.log('invalid form');
      console.log(this.profileForm);
      return;
    }
    console.log(this.profileForm);
    this.sellerProfileService.saveProfile(
      this.shopName.value,
      this.shopReg.value,
      this.address.value,
      this.city.value,
      this.cantactNo.value,
      this.latitude.value,
      this.longitude.value,
      this.about.value
    );
  }

  onEdit() {
    this.sellerProfileService.getProfile().subscribe(profile => {
      const myprofile = {
        fullName: profile.result.fullName,
        mobileNumber: profile.result.mobileNumber,
        shopName: profile.result.profile.shopName,
        shopReg: profile.result.profile.shopReg,
        address: profile.result.profile.address,
        city: profile.result.profile.city,
        contactNo: profile.result.profile.contactNo,
        latitude: profile.result.profile.latitude,
        longitude: profile.result.profile.longitude,
        about: profile.result.profile.about
      };
      this.profile = profile;
    });
  }
}
