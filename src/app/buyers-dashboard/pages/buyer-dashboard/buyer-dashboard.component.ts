import { Component, OnInit } from '@angular/core';

import { CarSelectorService } from '../../services/car-selector.service';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.scss']
})
export class BuyerDashboardComponent implements OnInit {

  makers = [];
  models = [];
  selectedMaker = 'Audi';

  constructor(private carSelectorService: CarSelectorService) { }

  ngOnInit() {
    this.carSelectorService.getVehicleDataJSON();
    this.makers = this.carSelectorService.getVehicleMakers();
    this.models = this.carSelectorService.getVehicleModel(this.selectedMaker);
  }

  changeMaker() {
    this.models = [];
    this.models = this.carSelectorService.getVehicleModel(this.selectedMaker);
  }

}
