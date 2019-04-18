import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CategoryData } from './models/category-data.model';

@Injectable({
  providedIn: 'root'
})
export class AdminConfigureService {

  constructor(private http: HttpClient) {}

  createCategory(catName: string) {
    const categoryData: CategoryData = { catName: catName };
    this.http.post('http://localhost:3000/api/admin/category/create', categoryData)
      .subscribe(respose => {
        console.log(respose);
      });
  }
}
