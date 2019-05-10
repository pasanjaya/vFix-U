import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AdminDatabaseData } from './admin-database.model';

@Injectable({
  providedIn: 'root'
})
export class AdminDatabaseService {

  private consumerDatabase: AdminDatabaseData[] = [];

  private consumerDatabaseUpdated = new Subject<AdminDatabaseData[]>();

  constructor(private http: HttpClient) {}

  getConsumerDatabaseUpdatedListener() {
    return this.consumerDatabaseUpdated.asObservable();
  }

  getConsumerData() {
    this.http.get<{ message: string; userData: any }>('http://localhost:3000/api/user/consumerdata')
    .pipe(map((consumers) => {
      return consumers.userData.map(user => {
        const consumer: AdminDatabaseData = {
          id: user._id,
          name: user.fullName,
          email: user.email
        };
        return consumer;
      });
    }))
    .subscribe(transformedData => {
      this.consumerDatabase = transformedData;
      this.consumerDatabaseUpdated.next([...this.consumerDatabase]);
    });
  }

  deleteConsumer(consumerId: string) {
    this.http.delete<{message: string}>('http://localhost:3000/api/user/consumerremove/' + consumerId)
      .subscribe((result) => {
        console.log(result.message);
        const updatedConsumer = this.consumerDatabase.filter(consumer => consumer.id !== consumerId);
        this.consumerDatabase = updatedConsumer;
        this.consumerDatabaseUpdated.next([...this.consumerDatabase]);
      });
  }

}
