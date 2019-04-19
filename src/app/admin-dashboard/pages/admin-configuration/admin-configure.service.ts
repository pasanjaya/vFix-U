import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CategoryData } from './models/category-data.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminConfigureService {

  private categories: CategoryData[] = [];
  private categoriesUpdated = new Subject<CategoryData[]>();

  constructor(private http: HttpClient) {}

  createCategory(catName: string) {
    const categoryData: CategoryData = { catName };
    this.http.post<{messege: string, result: any }>('http://localhost:3000/api/admin/category/create', categoryData)
      .subscribe(respose => {
        console.log(respose);
        const id = respose.result._id;
        categoryData.id = id;
        this.categories.push(categoryData);
        this.categoriesUpdated.next([...this.categories]);
      });
  }

  getCategories() {
    this.http
      .get<{ message: string; categories: any }>(
        'http://localhost:3000/api/admin/category/retrive'
      )
      .pipe(map((catData) => {
        return catData.categories.map(category => {
          return {
            id: category._id,
            catName: category.catName
          };
        });
      }))
      .subscribe(transformData => {
        this.categories = transformData;
        this.categoriesUpdated.next([...this.categories]);
      });
  }

  getCategoryUpdatedListener() {
    return this.categoriesUpdated.asObservable();
  }

  deleteCategory(categoryId: string) {
    this.http.delete('http://localhost:3000/api/admin/category/delete/' + categoryId)
      .subscribe(() => {
        console.log('Deleted!');
        const updatedCategories = this.categories.filter(category => category.id !== categoryId);
        this.categories = updatedCategories;
        this.categoriesUpdated.next([...this.categories]);
      });
  }
}
