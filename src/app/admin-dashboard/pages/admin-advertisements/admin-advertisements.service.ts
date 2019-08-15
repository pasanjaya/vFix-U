import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface AdvertisementData {
  id?: string;
  title: string;
  description: string;
  advertisementPath: string;
  created_at?: Date;
  modified_at?: Date;
}

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AdminAdvertisementsService {

  private response: any;
  private advertisement: AdvertisementData[] = [];
  private advertisementUpdated = new Subject<AdvertisementData[]>();

  constructor(private http: HttpClient) {}

  getNewArrivals() {
    this.http
      .get<{ message: string; result?: any }>('http://localhost:3000/api/landing/adv/approve')
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

  approveAdvertisement(id: string) {
    this.http.put('http://localhost:3000/api/landing/approve/' + id, { approved: true })
    .subscribe(response => {
      console.log(response);
    });
  }



  deleteAdvertisement(id: string) {
    this.http.delete('http://localhost:3000/api/landing/delete/' + id)
    .subscribe(() => {
      console.log('deleted');
      const updatedAdvertisements = this.advertisement.filter(advert => advert.id !== id);
      this.advertisement = updatedAdvertisements;
      this.advertisementUpdated.next([...this.advertisement]);
    });
  }



}
