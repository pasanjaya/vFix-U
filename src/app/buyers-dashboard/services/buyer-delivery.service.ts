import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { OrderResponse } from '../../models/order-response.model'

@Injectable({
    providedIn: 'root' 
})

export class BuyerDeliveryService{

    constructor(private http: HttpClient){}

    getOrderResponses(orderReqId: string){
        return this.http
        .get<{message: String ; response: any}>('http://localhost:3000/api/message/response/order/' + orderReqId)
        
    }
}