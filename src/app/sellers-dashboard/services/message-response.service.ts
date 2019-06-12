import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageResponseService {
  constructor(private http: HttpClient) {}

  createResponse(
    requestId: string,
    oemNumber: string,
    remanufactured: boolean,
    condition: string,
    unitPrice: string,
    imagePath: File,
    material: string,
    model: string,
    brand: string,
    note: string
  ) {

    const boolAsString = (remanufactured) ? 'true' : 'false';
    const messageResponseData = new FormData();
    messageResponseData.append('requestId', requestId);
    messageResponseData.append('oemNumber', oemNumber);
    messageResponseData.append('remanufactured', boolAsString);
    messageResponseData.append('condition', condition);
    messageResponseData.append('unitPrice', unitPrice);
    messageResponseData.append('image', imagePath);
    messageResponseData.append('material', material);
    messageResponseData.append('model', model);
    messageResponseData.append('brand', brand);
    messageResponseData.append('note', note);


    this.http.post<{message: string, result: string}>('http://localhost:3000/api/message/response/create', messageResponseData)
    .subscribe(response => {
      console.log(response);
    });
  }

  rejectRequest(rejectId: string, status: string) {

    const messageIgnore = {
      request_id: rejectId,
      status: status
    };

    this.http.post('http://localhost:3000/api/message/response/reqIgnore', messageIgnore).subscribe(response => {
      console.log(response);
    });
  }
}
