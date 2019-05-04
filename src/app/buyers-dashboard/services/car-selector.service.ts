import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CarSelectorService {

  private vehicleMakers = [];

  constructor(private http: HttpClient) { }

  getVehicleMakers() {
    return this.vehicleMakers;
  }

  getVehicleDataJSON() {
    this.http.get<any>('assets/data/cars.json').subscribe((result) => {
      for (const data of result) {
        const maker = data.Identification.Make;
        if (!this.vehicleMakers.includes(maker)) {
          this.vehicleMakers.push(maker);
        }
      }
    });
  }

  getVehicleModel(selectedMaker: string) {
    const vehicleModel = [];
    this.http.get<any>('assets/data/cars.json').subscribe((result: any) => {
      result.map((item: any) => {
        const make = item.Identification.Make;
        if (make === selectedMaker) {
          const model = item.Identification.ID;
          vehicleModel.push(model);
        }
      });
    });
    return vehicleModel;
  }


}
