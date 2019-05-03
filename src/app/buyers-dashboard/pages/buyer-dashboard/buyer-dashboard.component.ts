import { Component, OnInit } from '@angular/core';

import { CarSelectorService } from '../../services/car-selector.service';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.scss']
})
export class BuyerDashboardComponent implements OnInit {

  constructor(private carSelectorService: CarSelectorService) { }

  ngOnInit() {
    // this.carSelectorService.getVehicalDataJSON().subscribe(data => {
    //   console.log(data);
    // });
  }

}
