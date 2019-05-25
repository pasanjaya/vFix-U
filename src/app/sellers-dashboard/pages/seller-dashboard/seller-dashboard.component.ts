import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap';

import { MessageRequestData } from 'src/app/models/message-request-data.model';

import { MessageRequestService } from './../../../buyers-dashboard/services/message-request.service';

import { SellerDashboardCatchitComponent } from './seller-dashboard-catchit/seller-dashboard-catchit.component';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.scss']
})
export class SellerDashboardComponent implements OnInit, OnDestroy {
  isLoading = false;
  messagesData: MessageRequestData[] = [];

  private messageDataSub: Subscription;

  bsModalRef: BsModalRef;

  constructor(private messageRequestService: MessageRequestService, private modalService: BsModalService) { }

  ngOnInit() {
    // retrive the messages
    this.isLoading = true;
    this.messageRequestService.getMessageRequestSeller();
    this.messageDataSub = this.messageRequestService.getMessageDataUpdatedListener()
      .subscribe((requestMessages: MessageRequestData[]) => {
        this.messagesData = requestMessages;
        this.isLoading = false;
      });

  }

  ngOnDestroy() {
    this.messageDataSub.unsubscribe();
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

    this.bsModalRef = this.modalService.show(SellerDashboardCatchitComponent, { initialState, class: 'modal-lg' });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
