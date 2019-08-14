import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SupportData } from 'src/app/models/support-data.model';
import { environment } from 'src/environments/environment.prod';

const BACKEND_URL = environment.apiUrl + 'support/';


@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private supportData: SupportData[] = [];
  private supportDataUpdated = new Subject<SupportData[]>();

  constructor(private http: HttpClient) { }

  createRequest(
    fullName: string,
    email: string,
    phoneNo: number,
    message: string
  ) {
    const supportData: SupportData = {
      fullName,
      email,
      phoneNo,
      message
    };

    this.http
      .post<{ message: string; result: any }>(
        BACKEND_URL + 'create', supportData
      )
      .subscribe(response => {
        console.log(response);
      });
  }


  // support data retive
  getSupportList() {
     this.http
       .get<{ message: string; supportDataCollections: any }>(
        BACKEND_URL + 'retrive'
       )
       .pipe(
         map(messageData => {
           return messageData.supportDataCollections.map(
             supportDataCollection => {
               return {
                 id: supportDataCollection._id,
                 fullName: supportDataCollection.fullName,
                 email: supportDataCollection.email,
                 phoneNo: supportDataCollection.phoneNo,
                 message: supportDataCollection.message
               };
             }
           );
         })
       )
       .subscribe(transformedData => {
         this.supportData = transformedData;
         this.supportDataUpdated.next([...this.supportData]);
       });
  }

  getSupportDataUpdatedListener() {
    return this.supportDataUpdated.asObservable();
  }

//   // sellers message retrive
//   getMessageRequestSeller(currentPage: number) {
//     const queryParams = `?page=${currentPage}`;
//     this.http
//       .get<{
//         message: string;
//         messageDataCollections: any;
//         maxMessage: number;
//       }>('http://localhost:3000/api/message/retrive-seller' + queryParams)
//       .pipe(
//         map(messageData => {
//           return {
//             messages: messageData.messageDataCollections.map(
//               messageDataCollection => {
//                 return {
//                   id: messageDataCollection._id,
//                   maker: messageDataCollection.vehicalMaker,
//                   model: messageDataCollection.vehicalModel,
//                   categoryId: messageDataCollection.categoryId,
//                   sparePartName: messageDataCollection.sparePartName,
//                   partImagePath: messageDataCollection.itemImagePath,
//                   note: messageDataCollection.itemNote,
//                   messageCreator: messageDataCollection.messageCreator,
//                   responses: messageDataCollection.rensponses,
//                   created_at: messageDataCollection.created_at
//                 };
//               }
//             ),
//             maxMessage: messageData.maxMessage
//           };
//         })
//       )
//       .subscribe(transformedData => {
//         this.messagesSellerData = transformedData.messages;
//         this.messageSellerDataUpdated.next({
//           messages: [...this.messagesSellerData],
//           messageCount: transformedData.maxMessage
//         });
//       });
//   }

//   getMessageSellerDataUpdatedListener() {
//     return this.messageSellerDataUpdated.asObservable();
//   }

//   getMessageResponses(messageReqId: string) {
//     this.http
//       .get<{ message: string; responseCollection: any }>(
//         'http://localhost:3000/api/message/response/retrive/' + messageReqId
//       )
//       .pipe(
//         map(response => {
//           return response.responseCollection.map(document => {
//             const responseData: MessageResponseData = {
//               id: document._id,
//               requestId: document.requestId,
//               oemNumber: document.oemNumber,
//               remanufactured: document.remanufactured,
//               condition: document.condition,
//               unitPrice: document.unitPrice,
//               imagePath: document.imagePath,
//               material: document.material,
//               model: document.model,
//               brand: document.brand,
//               note: document.note,
//               responseCreator: document.responseCreator,
//               created_at: document.created_at
//             };
//             return responseData;
//           });
//         })
//       )
//       .subscribe(transformedResult => {
//         this.responseData = transformedResult;
//         this.responseDataUpdated.next([...this.responseData]);
//       });
//   }

//   getResponseDataUpdateListener() {
//     return this.responseDataUpdated.asObservable();
//   }
}

