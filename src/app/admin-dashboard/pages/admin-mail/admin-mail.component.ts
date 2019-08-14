import { Component, OnInit, OnDestroy } from '@angular/core';
import { SupportData } from 'src/app/models/support-data.model';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { SupportService } from './../../../services/support.service';
import { DeleteConfirmationBoxComponent } from 'src/app/shared/delete-confirmation-box/delete-confirmation-box.component';

@Component({
  selector: 'app-admin-mail',
  templateUrl: './admin-mail.component.html',
  styleUrls: ['./admin-mail.component.scss']
})
export class AdminMailComponent implements OnInit, OnDestroy {
  isLoading = false;
  supportData: SupportData[] = [];

  private supportDataSub: Subscription;

  constructor(
    private supportService: SupportService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.supportService.getSupportList();
    this.supportDataSub = this.supportService
      .getSupportDataUpdatedListener()
      .subscribe((supportData) => {
        this.supportData = supportData;
        this.isLoading = false;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationBoxComponent, {
      width: '350px',
      data: 'Do you confirm the removal of this request?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
      }
    });
  }

  ngOnDestroy() {
    this.supportDataSub.unsubscribe();
  }
}


