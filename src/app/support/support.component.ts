import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { SupportService } from '../services/support.service';
import { SupportData } from 'src/app/models/support-data.model';
import { DeleteConfirmationBoxComponent } from '../shared/delete-confirmation-box/delete-confirmation-box.component';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  supportForm: FormGroup;

  support: SupportData[] = [];
  private supportSub: Subscription;

  constructor(private supportService: SupportService, public dialog: MatDialog) { }

  ngOnInit() {
    this.supportForm = new FormGroup({
      fullName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      phoneNo: new FormControl(null, Validators.required),
      message: new FormControl (null, Validators.required),
  });
}
openDialog(): void {
  const dialogRef = this.dialog.open(DeleteConfirmationBoxComponent, {
    width: '350px',
    data: 'Do you wish to proceed?'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Yes clicked');
      this.onPublish();
    }
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
