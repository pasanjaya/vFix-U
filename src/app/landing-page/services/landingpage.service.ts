import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AdvertisementData } from 'src/app/models/advertisement-data.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  private response: any;
  private advertisement: AdvertisementData[] = [];
  private advertisementUpdated = new Subject<AdvertisementData[]>();

  constructor(private http: HttpClient) {}

  getNewArrivals() {
    this.http
      .get<{ message: string; result?: any }>('http://localhost:3000/api/landing/newarrival')
      .subscribe(adv => {
        this.response = adv.result;
        this.response.forEach(ad => {
          const advertisement: AdvertisementData = {
            id: ad._id,
            title: ad.title,
            description: ad.description,
            advertisementPath: ad.advImage
          };
          this.advertisement.push(advertisement);
          this.advertisementUpdated.next([...this.advertisement]);
        });
      });
  }

  getAdvertisementUpdatedListener() {
    return this.advertisementUpdated.asObservable();
  }
}
