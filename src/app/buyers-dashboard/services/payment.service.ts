import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Payment} from '../pages/buyer-delivery-option/payment.model'
import {Summary} from '../pages/buyer-delivery-option/summary.model'
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class  PaymentService{

    constructor(private http: HttpClient){}

    savePayment(payment: Payment): Observable<any>{
        return this.http.post("http://localhost:3000/api/payment/pay",{
            "first_name": payment.first_name,
            "last_name": payment.last_name,
            "address": payment.address,
            "city": payment.city,
            "country": payment.country,
            "email": payment.email,
            "pnumber": payment.pnumber,
            "amount": payment.amount,
            "orderId": payment.order_id

        });

   
    }
    saveSummary(summary: Summary): Observable<any>{
        return this.http.post("http://localhost:3000/api/summarize/summarize",{
            "unitPrice": summary.unitPrice,
            "order_id": summary.order_id,
            "quantity": summary.quantity,
            "deleveryCost": summary.deleveryCost,
            "seller_id": summary.seller_id,
            "recipient_name": summary.recipient_name,
            "recipient_address": summary.recipient_address,
            "recipient_city": summary.recipient_city,
            "recipient_contact": summary.recipirnt_contact

        })
    }

}
