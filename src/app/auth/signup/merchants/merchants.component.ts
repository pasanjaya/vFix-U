import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss']
})
export class MerchantsComponent implements OnInit {

  @Input()
  isConsumers: boolean;

  @Output()
  isConsumersChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.isConsumersChange.emit(!this.isConsumers);
  }

}
