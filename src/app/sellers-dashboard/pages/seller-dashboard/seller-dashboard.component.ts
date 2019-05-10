import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { MessageRequestData } from 'src/app/models/message-request-data.model';

import { MessageRequestService } from './../../../buyers-dashboard/services/message-request.service';

import { SellerDashboardCatchitComponent } from './seller-dashboard-catchit/seller-dashboard-catchit.component';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.scss']
})
export class SellerDashboardComponent implements OnInit, OnDestroy {

  messagesData: MessageRequestData[] = [];

  private messageDataSub: Subscription;

  bsModalRef: BsModalRef;

  constructor(private messageRequestService: MessageRequestService, private modalService: BsModalService) { }

  ngOnInit() {
    // retrive the messages
    this.messageRequestService.getMessageRequest();
    this.messageDataSub = this.messageRequestService.getMessageDataUpdatedListener()
      .subscribe((requestMessages: MessageRequestData[]) => {
        this.messagesData = requestMessages;
      });

  }

  ngOnDestroy() {
    this.messageDataSub.unsubscribe();
  }

  catchIt() {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(SellerDashboardCatchitComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
