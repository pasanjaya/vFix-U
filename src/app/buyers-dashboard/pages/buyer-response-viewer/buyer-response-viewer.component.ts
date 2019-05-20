import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { MessageRequestService } from '../../services/message-request.service';
import { MessageResponseData } from 'src/app/models/message-response-data.model';

@Component({
  selector: 'app-buyer-response-viewer',
  templateUrl: './buyer-response-viewer.component.html',
  styleUrls: ['./buyer-response-viewer.component.scss']
})
export class BuyerResponseViewerComponent implements OnInit, OnDestroy {

  responseData: MessageResponseData[] = [];
  contentData: MessageResponseData[] = [];

  private queryParamsSub: Subscription;
  private responseDataSub: Subscription;

  constructor(private route: ActivatedRoute, private messageRequestService: MessageRequestService) { }

  ngOnInit() {
    let messageId = this.route.snapshot.queryParams['view'];
    this.queryParamsSub = this.route.queryParams
      .subscribe((qParams) => {
        messageId = qParams['view'];
      });
    // console.log(this.route.snapshot.fragment);
    return new Promise((resolve, reject) => {
      this.messageRequestService.getMessageResponses(messageId);
      this.responseDataSub = this.messageRequestService.getResponseDataUpdateListener().subscribe((response: MessageResponseData[]) => {
        if (response) {
          this.responseData = response;
          resolve();
        } else {
          reject();
        }
      });
    }).then(() => {
      this.contentData.push(this.responseData[0]);
      console.log(this.contentData);
    })
    .catch(() => console.log('Error undifined subscribe'));
  }

  ngOnDestroy() {
    this.queryParamsSub.unsubscribe();
    this.responseDataSub.unsubscribe();
  }

  changeContent(index: number) {
    this.contentData = [];
    this.contentData.push(this.responseData[index]);
    console.log(this.contentData);
  }

}
