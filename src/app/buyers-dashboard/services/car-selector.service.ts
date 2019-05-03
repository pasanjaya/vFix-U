import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarSelectorService {

  constructor(private http: HttpClient) { }

  getVehicalDataJSON(): Observable<any> {

    return this.http.get('https://www.autodoc.co.uk/ajax/selector');
  }
}
