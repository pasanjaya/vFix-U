import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buyer-profile',
  templateUrl: './buyer-profile.component.html',
  styleUrls: ['./buyer-profile.component.scss']
})
export class BuyerProfileComponent implements OnInit {

  constructor() { }
  profileForm: FormGroup;

  ngOnInit() {
    this.profileForm = new FormGroup({
      mode: new FormControl(false, Validators.required),
      name: new FormControl(null, Validators.required),
      nic: new FormControl(null, Validators.required),
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

get name() {
  return this.profileForm.get('name');
}
get nic() {
  return this.profileForm.get('nic');
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
  // this.buyerProfileService.saveProfile(
  //   this.name.value,
  //   this.nic.value,
  //   this.address.value,
  //   this.city.value,
  //   this.cantactNo.value,
  //   this.latitude.value,
  //   this.longitude.value,
  //   this.about.value
  // );
}
}
