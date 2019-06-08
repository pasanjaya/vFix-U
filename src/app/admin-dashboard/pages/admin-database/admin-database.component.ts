import { Component, OnInit, OnDestroy } from '@angular/core';

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

  constructor(private adminDatabaseService: AdminDatabaseService) { }

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

  onDeleteConsumer(consumerId: string) {
    this.adminDatabaseService.deleteConsumer(consumerId);
  }

  onDeleteMerchant(merchantId: string) {
    this.adminDatabaseService.deleteMerchant(merchantId);
  }

  ngOnDestroy() {
    this.consumerDatabaseSub.unsubscribe();
    this.merchantDatabaseSub.unsubscribe();
  }

}
