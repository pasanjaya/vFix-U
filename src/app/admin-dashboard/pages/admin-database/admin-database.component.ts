import { DeleteConfirmationBoxComponent } from 'src/app/shared/delete-confirmation-box/delete-confirmation-box.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AdminDatabaseService } from './admin-database.service';

import { AdminDatabaseData } from './admin-database.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-database',
  templateUrl: './admin-database.component.html',
  styleUrls: ['./admin-database.component.scss']
})
export class AdminDatabaseComponent implements OnInit, OnDestroy {

  images = [];

  consumerDatabase: AdminDatabaseData[] = [];
  private consumerDatabaseSub: Subscription;

  merchantDatabase: AdminDatabaseData[] = [];
  private merchantDatabaseSub: Subscription;

  constructor(
    private adminDatabaseService: AdminDatabaseService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.adminDatabaseService.getConsumerData();
    this.consumerDatabaseSub = this.adminDatabaseService.getConsumerDatabaseUpdatedListener()
      .subscribe((consumerData: AdminDatabaseData[]) => {
        this.consumerDatabase = consumerData;
      });

    this.adminDatabaseService.getMerchantData();
    this.merchantDatabaseSub = this.adminDatabaseService.getMerchantDatabaseUpdatedListener()
      .subscribe((merchantData: AdminDatabaseData[]) => {
        this.merchantDatabase = merchantData;
      });
  }

  onAddImage() {

  }

  onDeleteConsumer(consumerId: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationBoxComponent, {
      width: '350px',
      data: 'Are You Sure? This will delete every details of this consumer'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        this.adminDatabaseService.deleteConsumer(consumerId);
      }
    });
  }

  onDeleteMerchant(merchantId: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationBoxComponent, {
      width: '350px',
      data: 'Are You Sure? This will delete every details of this merchant'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        this.adminDatabaseService.deleteMerchant(merchantId);
      }
    });
  }

  ngOnDestroy() {
    this.consumerDatabaseSub.unsubscribe();
    this.merchantDatabaseSub.unsubscribe();
  }

}
