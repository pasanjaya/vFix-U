import { MessageResponseService } from './../../services/message-response.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService, PageChangedEvent } from 'ngx-bootstrap';
import { MatDialog } from '@angular/material';

import { MessageRequestData } from 'src/app/models/message-request-data.model';

import { MessageRequestService } from './../../../buyers-dashboard/services/message-request.service';
import { SellerProfileService } from '../../services/seller-profile.service';

import { SellerDashboardCatchitComponent } from './seller-dashboard-catchit/seller-dashboard-catchit.component';
import { DeleteConfirmationBoxComponent } from 'src/app/shared/delete-confirmation-box/delete-confirmation-box.component';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.scss']
})
export class SellerDashboardComponent implements OnInit, OnDestroy {
  hasProfile = false;
  isLoading = false;
  username = '';
  messagesData: MessageRequestData[] = [];
  currentPage = 1;
  totalMessageCount = 0;
  messagePerPage = 3;

  private messageDataSub: Subscription;

  bsModalRef: BsModalRef;

  constructor(
    private sellerProfileService: SellerProfileService,
    private messageRequestService: MessageRequestService,
    private messageResponseService: MessageResponseService,
    private modalService: BsModalService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.isLoading = true;
    return new Promise((resolve, reject) => {
      this.sellerProfileService.getUser().subscribe(user => {
        this.username = user.result.fullName;
        if (user.result.profile) {
          this.hasProfile = true;
          resolve();
        } else {
          reject();
        }
      });
    }).then(() => {
      // retrive the messages
      this.messageRequestService.getMessageRequestSeller(this.currentPage);
      this.messageDataSub = this.messageRequestService
        .getMessageSellerDataUpdatedListener()
        .subscribe((requestMessagesData: { messages: MessageRequestData[], messageCount: number }) => {
          this.messagesData = requestMessagesData.messages;
          this.totalMessageCount = requestMessagesData.messageCount;
          this.isLoading = false;
        });
    }).catch(() => {
      console.log('Profile not created');
      this.isLoading = false;
    });
  }

  pageChanged(event: PageChangedEvent) {
    this.isLoading = true;
    this.currentPage = event.page;
    this.messageRequestService.getMessageRequestSeller(this.currentPage);
    this.isLoading = false;
  }

  catchIt(index: number) {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Response for the Customer',
      data: this.messagesData[index]
    };

    this.bsModalRef = this.modalService.show(SellerDashboardCatchitComponent, {
      initialState,
      class: 'modal-lg'
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  ignored(id: string) {
    const updatedMessage = this.messagesData.filter(advert => advert.id !== id);
    this.messagesData = updatedMessage;
    this.messageResponseService.rejectCatchRequest(id, 'ignore');
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationBoxComponent, {
      width: '350px',
      data: 'Do you confirm the ignorance of this request?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        this.ignored(id);
      }
    });
  }

  ngOnDestroy() {
    if (this.hasProfile) {
      this.messageDataSub.unsubscribe();
    }
  }
}
