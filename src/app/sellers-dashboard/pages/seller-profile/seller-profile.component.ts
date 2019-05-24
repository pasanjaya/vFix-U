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
  constructor(private sellerProfileService: SellerProfileService) {}

  profileForm: FormGroup;
  private profileMode = false;
  userData: Merchant[] = [];

  ngOnInit() {
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
    // this.sellerProfileService.getUser();
    // this.sellerProfileService.getuserDataUpdatedListener()
    //   .subscribe((userData: Merchant[]) => {
    //     this.userData = userData;
    //     console.log(this.userData);
    // });

    // if (!this.profileMode) {
    //   this.sellerProfileService.getProfile();
    // }
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
}
