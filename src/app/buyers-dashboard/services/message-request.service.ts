import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageRequestData } from 'src/app/models/message-request-data.model';

@Injectable({
  providedIn: 'root'
})
export class MessageRequestService {
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
      .post<{message: string, result: any }>('http://localhost:3000/api/message/create', messageRequestData)
      .subscribe(response => {
        // const messageRequest: MessageRequestData = {
        //   id: response.result._id,
        //   maker,
        //   model,
        //   categoryId,
        //   sparePartName,
        //   partImagePath,
        //   note
        // };
        console.log(response);
      });
  }
}
