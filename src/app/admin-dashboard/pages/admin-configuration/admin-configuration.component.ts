import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-configuration',
  templateUrl: './admin-configuration.component.html',
  styleUrls: ['./admin-configuration.component.scss']
})
export class AdminConfigurationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onAddCategory(category) {
    console.log(category.value);
  }

  onDeleteCategory() {

  }

}
