import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { mimeType } from 'src/app/validators/mime-type.validator';

@Component({
  selector: 'app-seller-advertise',
  templateUrl: './seller-advertise.component.html',
  styleUrls: ['./seller-advertise.component.scss']
})
export class SellerAdvertiseComponent implements OnInit {

  advImagePreviewPath: string;
  advertisingForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.advertisingForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      advImage: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });
  }

  onAdvImageUpload(event: Event) {
    const image = (event.target as HTMLInputElement).files[0];
    this.advertisingForm.patchValue({advImage: image});
    this.advertisingForm.get('advImage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.advImagePreviewPath = reader.result as string;
    };
    reader.readAsDataURL(image);
  }

  onPublish() {
    if (this.advertisingForm.invalid) {
      console.log(this.advertisingForm);
      return;
    }
  }

}
