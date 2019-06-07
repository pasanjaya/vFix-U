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

  isLoading = false;
  profile: any;
  hasProfile = false;
  firstName = '';
  userName = '';
  editMode = false;
  profileForm: FormGroup;
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
      shopName: new FormControl(null, Validators.required),
      shopReg: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      city: new FormControl('Colombo', Validators.required),
      contactNo: new FormControl(null, Validators.required),
      latitude: new FormControl(null, Validators.required),
      longitude: new FormControl(null, Validators.required),
      about: new FormControl(null)
    });
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

  get contactNo() {
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
    if (!this.editMode) {
      console.log(this.profileForm);
      this.sellerProfileService.saveProfile(
        this.shopName.value,
        this.shopReg.value,
        this.address.value,
        this.city.value,
        this.contactNo.value,
        this.latitude.value,
        this.longitude.value,
        this.about.value
      );
    }

    if (this.editMode) {
      console.log('updated mode  jnnj');
      this.sellerProfileService.updateProfile(
        this.profile.id,
        this.shopName.value,
        this.shopReg.value,
        this.address.value,
        this.city.value,
        this.contactNo.value,
        this.latitude.value,
        this.longitude.value,
        this.about.value
      );
    }
  }

  getProfileData() {
    return new Promise( resolve => {
      this.sellerProfileService.getProfile().subscribe(profile => {
        console.log(profile);
        const myprofile = {
          id: profile.result.profile._id,
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
        this.profile = myprofile;
        resolve();
      });
    });
  }

  onEdit() {
    this.editMode = true;
    this.isLoading = true;
    this.getProfileData().then(() => {
      this.profileForm.setValue({
        shopName: this.profile.shopName,
        shopReg: this.profile.shopReg,
        address: this.profile.address,
        city: this.profile.city,
        contactNo: this.profile.contactNo,
        latitude: this.profile.latitude,
        longitude: this.profile.longitude,
        about: this.profile.about
      });
      this.isLoading = false;
    });


  }
}
