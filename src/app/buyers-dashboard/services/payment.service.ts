import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Payment} from '../pages/buyer-delivery-option/payment.model'
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

}
