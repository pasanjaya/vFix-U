import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { AdminAdvertisementsService } from './admin-advertisements.service';
import { DeleteConfirmationBoxComponent } from 'src/app/shared/delete-confirmation-box/delete-confirmation-box.component';

interface AdvertisementData {
  id?: string;
  title: string;
  description: string;
  advertisementPath: string;
  created_at?: Date;
  modified_at?: Date;
}

@Component({
  selector: 'app-admin-advertisements',
  templateUrl: './admin-advertisements.component.html',
  styleUrls: ['./admin-advertisements.component.scss']
})
export class AdminAdvertisementsComponent implements OnInit, OnDestroy {


  advertisements: AdvertisementData[] = [];
  private advertisementSub: Subscription;

  isLoading = false;

  constructor(private adminAdvertisementService: AdminAdvertisementsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;
    this.adminAdvertisementService.getNewArrivals();
    this.advertisementSub = this.adminAdvertisementService
      .getAdvertisementUpdatedListener()
      .subscribe((result: AdvertisementData[]) => {
        this.advertisements = result;
        this.isLoading = false;
      });
  }

  approve(id: string) {
    // this.adminAdvertisementService.approveAdvertisement(id);
  }

  // delete advertisements
  deleteAdv(id: string) {
    this.adminAdvertisementService.deleteAdvertisement(id);
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationBoxComponent, {
      width: '350px',
      data: 'Do you confirm the deletion of this advertisement?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        this.deleteAdv(id);
      }
    });
  }

  ngOnDestroy() {
    this.advertisementSub.unsubscribe();
  }

}
