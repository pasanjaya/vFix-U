import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CategoryData } from './models/category-data.model';

import { AdminConfigureService } from './admin-configure.service';

@Component({
  selector: 'app-admin-configuration',
  templateUrl: './admin-configuration.component.html',
  styleUrls: ['./admin-configuration.component.scss']
})
export class AdminConfigurationComponent implements OnInit, OnDestroy {

  categories: CategoryData[] = [];
  private categorySub: Subscription;

  constructor(public adminConfigure: AdminConfigureService) { }

  ngOnInit() {
    this.adminConfigure.getCategories();
    this.categorySub = this.adminConfigure.getCategoryUpdatedListener()
      .subscribe((categories: CategoryData[]) => {
        this.categories = categories;
      });
  }

  ngOnDestroy() {
    this.categorySub.unsubscribe();
  }

  onAddCategory(form: NgModel) {
    console.log(form);
    // this.adminConfigure.createCategory(category.value);
  }

  onDeleteCategory() {

  }

}
