import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-confirmation-box',
  templateUrl: './delete-confirmation-box.component.html',
  styleUrls: ['./delete-confirmation-box.component.scss']
})
export class DeleteConfirmationBoxComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteConfirmationBoxComponent>,
              @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
