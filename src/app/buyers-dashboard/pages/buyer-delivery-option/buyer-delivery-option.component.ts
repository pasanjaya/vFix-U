import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { BuyerDeliveryService } from '../../services/buyer-delivery.service';
import { AuthService} from '../../../auth/auth.service';
import {PaymentService} from '../../services/payment.service';

import{OrderResponse} from '../../../models/order-response.model';
import {Payment} from '../buyer-delivery-option/payment.model'

import { environment } from 'src/environments/environment';
import { Summary } from './summary.model';

@Component({
  selector: 'app-buyer-delivery-option',
  templateUrl: './buyer-delivery-option.component.html',
  styleUrls: ['./buyer-delivery-option.component.scss']
})


export class BuyerDeliveryOptionComponent implements OnInit {
  private BASEURL = environment.baseUrl;
  private queryParamsSub: Subscription;

  @ViewChild('payNow') payNowForm;

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private buyerDeliveryService: BuyerDeliveryService,
    private paymentService:PaymentService) { }

  currentPayment: Payment = {
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    country:'',
    email:'',
    pnumber:'',
    amount: 0,
    order_id: '',
  };
  payForm: FormGroup;
  country="Srilanka";
  ship_id: string = Math.random().toString(36).substring(8);

  private orderId: string;

  total = 0;
  quality = '';
  deliveryCost = 850;
  shippingForm: FormGroup;
  order_response: OrderResponse;
  
  private userId: String;
  return_url: string;
  cancel_url: string;
  userIsAuthenticated = false;
  private authListenerSub: Subscription;

  ngOnInit() {

    this.currentPayment.order_id = this.ship_id

   

   
    this.orderId = this.route.snapshot.queryParams['orderId'];
    this.queryParamsSub = this.route.queryParams
      .subscribe((qParams) => {
        this.orderId = qParams['orderId'];
      });
    
    this.userId = this.authService.getUserId();
    this.authListenerSub = this.authService.getAuthStatusLintener()
      .subscribe(isAuthenticated => {
        this.userId = this.authService.getUserId();
        this.return_url = "http://localhost:4200/buyerdashboard/" + this.userId + "/success";
        this.cancel_url = this.BASEURL + "/buyerdashboard/" + this.userId + "/cancel";
        console.log(this.return_url)
      });

      
    
    this.buyerDeliveryService.getOrderResponses(this.orderId)
    .subscribe(document => {
    
     
      const orderDetails: OrderResponse = {
        
          brand: document.response[0].brand,
          unitPrice: parseFloat(document.response[0].unitPrice),
          
          responseCreator: document.response[0].responseCreator.profile
      }
      this.order_response = orderDetails;
      console.log(this.order_response);

      
    })

    this.shippingForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      city: new FormControl('Colombo', Validators.required),
      contactNo: new FormControl(null, Validators.required),
      latitude: new FormControl(7.8731, Validators.required),
      longitude: new FormControl(80.7718, Validators.required),
      about: new FormControl(null)
    });
  }


  onSummery() {
    const orderSummery: Summary = {
      unitPrice: this.order_response.unitPrice,
      order_id: this.orderId,
      quantity: this.quality,
      deleveryCost:this.deliveryCost,
      seller_id:this.order_response.responseCreator.merchantId,
      recipient_name: this.shippingForm.get('name').value,
      recipient_address: this.shippingForm.get('address').value,
      recipient_city: this.shippingForm.get('city').value,
      recipirnt_contact: this.shippingForm.get('contactNo').value,


    }
    console.log("tttt")
    console.log(orderSummery)
    this.paymentService.saveSummary(orderSummery).subscribe(result =>{
      console.log(result);
    })

  }

  onPay(){
    this.paymentService.savePayment(this.currentPayment)
    .subscribe((Data)=>{
      this.payNowForm.nativeElement.submit();
    })
  }
  
  

  getQuality(event: Event){
    
    this.quality=(<HTMLInputElement>event.target).value
    console.log(this.quality)
    parseInt(this.quality);
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

}
