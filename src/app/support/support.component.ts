import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { SupportService } from '../services/support.service';
import { SupportData } from 'src/app/models/support-data.model';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  supportForm: FormGroup;

  support: SupportData[] = [];
  private supportSub: Subscription;

  constructor(private supportService: SupportService) { }

  ngOnInit() {
    this.supportForm = new FormGroup({
      fullName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      phoneNo: new FormControl(null, Validators.required),
      message: new FormControl (null, Validators.required),
  });
}

onPublish() {
  if (this.supportForm.invalid) {
    console.log(this.supportForm);

    return;
  }
  console.log(this.supportForm);
  this.supportService.createRequest(
      this.supportForm.get('fullName').value,
      this.supportForm.get('email').value,
      this.supportForm.get('phoneNo').value,
      this.supportForm.get('message').value,
    );
  this.supportForm.reset();

  }
}
