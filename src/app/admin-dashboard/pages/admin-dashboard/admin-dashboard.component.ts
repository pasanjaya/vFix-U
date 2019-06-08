import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from '../../../variables/charts';

import { AdminDashboardService } from './admin-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public userCount: { consumer: number, merchant: number };
  public totUserCount = 0;
  public now: Date = new Date();

  constructor(public adminDashboardService: AdminDashboardService) {
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  ngOnInit() {
    this.adminDashboardService.getUserCount()
      .subscribe((res: {consumer: number, merchant: number} ) => {
        this.userCount = res;
        this.totUserCount = res.consumer + res.merchant;
    });

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());

    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data
    });
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}
