import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { MessageRequestData } from 'src/app/models/message-request-data.model';

import { mimeType } from '../../../../validators/mime-type.validator';

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

  imagePreviewPath = '';

  sellerReplyForm: FormGroup;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.sellerReplyForm = new FormGroup({
      oemNumber: new FormControl(null, Validators.required),
      remanufactured: new FormControl(null),
      condition: new FormControl('new', Validators.requiredTrue),
      partPrice: new FormControl(null, Validators.required),
      partImage: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),
      material: new FormControl(null),
      model: new FormControl(null, Validators.required),
      brand: new FormControl(null, Validators.required),
      note: new FormControl(null)
    });
  }

  onSend() {
    console.log('Submited');
  }

}
