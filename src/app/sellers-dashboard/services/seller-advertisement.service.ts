import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

import { AdvertisementData } from '../../models/advertisement-data.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerAdvertisementService {
  private userId = '';
  private advertisement: AdvertisementData[] = [];
  private advertisementUpdated = new Subject<AdvertisementData[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getUserId() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    const decodedToken = helper.decodeToken(token);
    const tokenid = decodedToken.userId;
    this.userId = tokenid;
  }

  createAdvertisment(title: string, description: string, advImage: File) {
    const advertisment = new FormData();
    advertisment.append('title', title);
    advertisment.append('description', description);
    advertisment.append('image', advImage);

    this.http
      .post<{ message: string; result: any }>(
        'http://localhost:3000/api/merchant/adver/create',
        advertisment
      )
      .subscribe(response => {
        const advertisement: AdvertisementData = {
          id: response.result._id,
          title: response.result.title,
          description: response.result.description,
          advertisementPath: response.result.advImage,
          created_at: response.result.created_at
        };
        this.advertisement.push(advertisement);
        this.advertisementUpdated.next([...this.advertisement]);
        console.log(response);
      });
  }

  getAdvertisements() {
    this.http.get<{message: string; documents: any }>('http://localhost:3000/api/merchant/adver/retrive')
      .pipe(map(response => {
        return response.documents.map(document => {
          return {
            id: document._id,
            title: document.title,
            description: document.description,
            advertisementPath: document.advImage,
            created_at: document.created_at
          };
        });
      }))
      .subscribe(transformedData => {
        console.log(transformedData);
        this.advertisement = transformedData;
        this.advertisementUpdated.next([...this.advertisement]);
      });
  }

  getAdvertisementUpadateListener() {
    return this.advertisementUpdated.asObservable();
  }

  updateAdvertisement(id: string, title: string, description: string, image: File | string) {
    let advertiseData: FormData | AdvertisementData;
    if (typeof(image) === 'object') {
      advertiseData = new FormData();
      advertiseData.append('id', id);
      advertiseData.append('title', title);
      advertiseData.append('description', description);
      advertiseData.append('image', image, title);
    } else {
      advertiseData = {
        id,
        title,
        description,
        advertisementPath: image
      };
    }
    this.http.put('http://localhost:3000/api/merchant/adver/update/' + id, advertiseData)
    .subscribe(response => {
      console.log(response);
      const updatedAdv = [...this.advertisement];
      const oldAdvIndex = updatedAdv.findIndex(adv => adv.id === id);
      const advertisement: AdvertisementData = {
        id,
        title,
        description,
        advertisementPath: ''
      };
      updatedAdv[oldAdvIndex] = advertisement;
      this.advertisement = updatedAdv;
      this.advertisementUpdated.next([...this.advertisement]);
      this.getUserId();
      this.getAdvertisements();
    });
  }

  deleteAdvertisement(id: string) {
    this.http.delete('http://localhost:3000/api/merchant/adver/delete/' + id)
    .subscribe(() => {
      console.log('deleted');
      const updatedAdvertisements = this.advertisement.filter(advert => advert.id !== id);
      this.advertisement = updatedAdvertisements;
      this.advertisementUpdated.next([...this.advertisement]);
    });
  }


}
