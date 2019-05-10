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

  constructor(private adminDatabaseService: AdminDatabaseService) { }

  ngOnInit() {
    this.adminDatabaseService.getConsumerData();
    this.consumerDatabaseSub = this.adminDatabaseService.getConsumerDatabaseUpdatedListener()
      .subscribe((consumerData: AdminDatabaseData[]) => {
        this.consumerDatabase = consumerData;
      });
  }

  ngOnDestroy() {
    this.consumerDatabaseSub.unsubscribe();
  }


  onAddImage() {

  }

  onDeleteConsumer(consumerId: string) {
    this.adminDatabaseService.deleteConsumer(consumerId);
  }

}
