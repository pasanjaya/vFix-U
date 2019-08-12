import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-buyer-delivery-option',
  templateUrl: './buyer-delivery-option.component.html',
  styleUrls: ['./buyer-delivery-option.component.scss']
})
export class BuyerDeliveryOptionComponent implements OnInit {

  constructor() { }

  shippingForm: FormGroup;

  ngOnInit() {
    this.shippingForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      city: new FormControl('Colombo', Validators.required),
      contactNo: new FormControl(null, Validators.required),
      latitude: new FormControl(7.8731, Validators.required),
      longitude: new FormControl(80.7718, Validators.required),
      about: new FormControl(null)
    });
  }


  onOrder() {

  }

}
