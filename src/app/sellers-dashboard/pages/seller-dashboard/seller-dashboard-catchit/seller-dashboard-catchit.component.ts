import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { MessageRequestData } from 'src/app/models/message-request-data.model';

import { mimeType } from '../../../../validators/mime-type.validator';
import { MessageResponseService } from 'src/app/sellers-dashboard/services/message-response.service';

@Component({
  selector: 'app-seller-dashboard-catchit',
  templateUrl: './seller-dashboard-catchit.component.html',
  styleUrls: ['./seller-dashboard-catchit.component.scss']
})
export class SellerDashboardCatchitComponent implements OnInit {
  title: string;
  closeBtnName: string;
  list: any[] = [];
  data = [];
  isInvalid = false;

  imagePreviewPath: string;

  sellerReplyForm: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private messageResponseService: MessageResponseService
  ) {}

  ngOnInit() {
    this.sellerReplyForm = new FormGroup({
      oemNumber: new FormControl(null, Validators.required),
      remanufactured: new FormControl(false, Validators.required),
      condition: new FormControl('new', Validators.required),
      partPrice: new FormControl(null, Validators.required),
      partImage: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      material: new FormControl(null),
      model: new FormControl(null),
      brand: new FormControl(null, Validators.required),
      note: new FormControl(null)
    });
  }

  get oemNumber() {
    return this.sellerReplyForm.get('oemNumber');
  }

  get remanufactured() {
    return this.sellerReplyForm.get('remanufactured');
  }

  get condition() {
    return this.sellerReplyForm.get('condition');
  }

  get partPrice() {
    return this.sellerReplyForm.get('partPrice');
  }

  get partImage() {
    return this.sellerReplyForm.get('partImage');
  }

  get material() {
    return this.sellerReplyForm.get('material');
  }

  get model() {
    return this.sellerReplyForm.get('model');
  }

  get brand() {
    return this.sellerReplyForm.get('brand');
  }

  get note() {
    return this.sellerReplyForm.get('note');
  }

  onImageUpload(event: Event) {
    const image = (event.target as HTMLInputElement).files[0];
    this.sellerReplyForm.patchValue({ partImage: image });
    this.sellerReplyForm.get('partImage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewPath = reader.result as string;
    };
    reader.readAsDataURL(image);
  }

  onSend() {
    console.log(this.sellerReplyForm);
    if (this.sellerReplyForm.invalid) {
      this.isInvalid = true;
      return;
    }

    this.messageResponseService.createResponse(
      this.data['id'],
      this.oemNumber.value,
      this.remanufactured.value,
      this.condition.value,
      this.partPrice.value,
      this.partImage.value,
      this.material.value,
      this.model.value,
      this.brand.value,
      this.note.value
    );
    console.log('done1');
    this.bsModalRef.hide();
  }
}
