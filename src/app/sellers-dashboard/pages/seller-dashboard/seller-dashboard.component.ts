import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { MessageRequestData } from 'src/app/models/message-request-data.model';

import { MessageRequestService } from './../../../buyers-dashboard/services/message-request.service';
import { SellerProfileService } from '../../services/seller-profile.service';

import { SellerDashboardCatchitComponent } from './seller-dashboard-catchit/seller-dashboard-catchit.component';

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

  private messageDataSub: Subscription;

  bsModalRef: BsModalRef;

  constructor(
    private sellerProfileService: SellerProfileService,
    private messageRequestService: MessageRequestService,
    private modalService: BsModalService
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
      this.messageRequestService.getMessageRequestSeller();
      this.messageDataSub = this.messageRequestService
        .getMessageDataUpdatedListener()
        .subscribe((requestMessages: MessageRequestData[]) => {
          this.messagesData = requestMessages;
          this.isLoading = false;
        });
    }).catch(() => {
      console.log('Profile not created');
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.hasProfile) {
      this.messageDataSub.unsubscribe();
    }
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
}
