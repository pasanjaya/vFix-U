import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { MessageRequestData } from 'src/app/models/message-request-data.model';
import { MessageResponseData } from 'src/app/models/message-response-data.model';

@Injectable({
  providedIn: 'root'
})
export class MessageRequestService {

  private messagesData: MessageRequestData[] = [];
  private responseData: MessageResponseData[] = [];
  private messageDataUpdated = new Subject<MessageRequestData[]>();
  private responseDataUpdated = new Subject<MessageResponseData[]>();

  constructor(private http: HttpClient) {}

  createRequest(
    maker: string,
    model: string,
    categoryId: string,
    sparePartName: string,
    image: File,
    note: string
  ) {
    const messageRequestData = new FormData();
    messageRequestData.append('maker', maker);
    messageRequestData.append('model', model);
    messageRequestData.append('categoryId', categoryId);
    messageRequestData.append('sparePartName', sparePartName);
    messageRequestData.append('image', image);
    messageRequestData.append('note', note);

    this.http
      .post<{ message: string; result: any }>(
        'http://localhost:3000/api/message/create',
        messageRequestData
      )
      .subscribe(response => {
        const messageRequest: MessageRequestData = {
          id: response.result._id,
          maker: response.result.maker,
          model: response.result.model,
          categoryId: response.result.categoryId,
          sparePartName: response.result.sparePartName,
          partImagePath: response.result.itemImagePath,
          note,
          messageCreator: response.result.messageCreator,
          created_at: response.result.created_at
        };
        this.messagesData.push(messageRequest);
        this.messageDataUpdated.next([...this.messagesData]);
        console.log(response);
      });
  }
// buyer message retive
  getMessageRequest() {
    this.http
      .get<{ message: string; messageDataCollections: any }>(
        'http://localhost:3000/api/message/retrive'
      )
      .pipe(
        map(messageData => {
          return messageData.messageDataCollections.map(
            messageDataCollection => {
              return {
                id: messageDataCollection._id,
                maker: messageDataCollection.vehicalMaker,
                model: messageDataCollection.vehicalModel,
                categoryId: messageDataCollection.categoryId,
                sparePartName: messageDataCollection.sparePartName,
                partImagePath: messageDataCollection.itemImagePath,
                note: messageDataCollection.itemNote,
                messageCreator: messageDataCollection.messageCreator,
                responses: messageDataCollection.rensponses,
                created_at: messageDataCollection.created_at
              };
            }
          );
        })
      )
      .subscribe(transformedData => {
        this.messagesData = transformedData;
        this.messageDataUpdated.next([...this.messagesData]);
      });
  }

  // sellers message retrive
  getMessageRequestSeller(currentPage: number) {
    const queryParams = `?page=${currentPage}`;
    this.http
      .get<{ message: string; messageDataCollections: any }>(
        'http://localhost:3000/api/message/retrive-seller' + queryParams
      )
      .pipe(
        map(messageData => {
          return messageData.messageDataCollections.map(
            messageDataCollection => {
              return {
                id: messageDataCollection._id,
                maker: messageDataCollection.vehicalMaker,
                model: messageDataCollection.vehicalModel,
                categoryId: messageDataCollection.categoryId,
                sparePartName: messageDataCollection.sparePartName,
                partImagePath: messageDataCollection.itemImagePath,
                note: messageDataCollection.itemNote,
                messageCreator: messageDataCollection.messageCreator,
                responses: messageDataCollection.rensponses,
                created_at: messageDataCollection.created_at
              };
            }
          );
        })
      )
      .subscribe(transformedData => {
        this.messagesData = transformedData;
        this.messageDataUpdated.next([...this.messagesData]);
      });
  }

  getMessageDataUpdatedListener() {
    return this.messageDataUpdated.asObservable();
  }

  getMessageResponses(messageReqId: string) {
    this.http.get<{ message: string; responseCollection: any }>(
      'http://localhost:3000/api/message/response/retrive/' + messageReqId
    )
    .pipe(
      map(response => {
      return response.responseCollection.map(document => {
        const responseData: MessageResponseData = {
          id: document._id,
          requestId: document.requestId,
          oemNumber: document.oemNumber,
          remanufactured: document.remanufactured,
          condition: document.condition,
          unitPrice: document.unitPrice,
          imagePath: document.imagePath,
          material: document.material,
          model: document.model,
          brand: document.brand,
          note: document.note,
          responseCreator: document.responseCreator,
          created_at: document.created_at
        };
        return responseData;
      });
    }))
    .subscribe((transformedResult) => {
      this.responseData = transformedResult;
      this.responseDataUpdated.next([...this.responseData]);
    });
  }

  getResponseDataUpdateListener() {
    return this.responseDataUpdated.asObservable();
  }


}
