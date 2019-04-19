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

  constructor(public adminConfigureService: AdminConfigureService) { }

  ngOnInit() {
    this.adminConfigureService.getCategories();
    this.categorySub = this.adminConfigureService.getCategoryUpdatedListener()
      .subscribe((categories: CategoryData[]) => {
        this.categories = categories;
      });
  }

  ngOnDestroy() {
    this.categorySub.unsubscribe();
  }

  onAddCategory(form: NgModel) {
    // console.log(form.value.category);
    if (form.invalid ) {
      return;
    }
    this.adminConfigureService.createCategory(form.value.category);
    form.reset();
  }

  onDeleteCategory(categoryId: string) {
    this.adminConfigureService.deleteCategory(categoryId);
  }

}
