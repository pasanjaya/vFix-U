import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BuyerDeliveryService } from '../../services/buyer-delivery.service';

import{OrderResponse} from '../../../models/order-response.model'

@Component({
  selector: 'app-buyer-delivery-option',
  templateUrl: './buyer-delivery-option.component.html',
  styleUrls: ['./buyer-delivery-option.component.scss']
})


export class BuyerDeliveryOptionComponent implements OnInit {

  private queryParamsSub: Subscription;

  constructor(private route: ActivatedRoute, private buyerDeliveryService: BuyerDeliveryService) { }

  
  total = 0;
  quality = '';
  shippingForm: FormGroup;
  order_response: OrderResponse;
  

  ngOnInit() {
    
    let orderId = this.route.snapshot.queryParams['orderId'];
    this.queryParamsSub = this.route.queryParams
      .subscribe((qParams) => {
        orderId = qParams['orderId'];
      });
    
    
    this.buyerDeliveryService.getOrderResponses(orderId)
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


  onOrder() {

  }
  

  getQuality(event: Event){
    
    this.quality=(<HTMLInputElement>event.target).value
    console.log(this.quality)
    parseInt(this.quality);
  }

}
