import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessageRequestData } from 'src/app/models/message-request-data.model';

import { MessageRequestService } from './../../../buyers-dashboard/services/message-request.service';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.scss']
})
export class SellerDashboardComponent implements OnInit, OnDestroy {

  messagesData: MessageRequestData[] = [];

  private messageDataSub: Subscription;

  constructor(private messageRequestService: MessageRequestService) { }

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

}
