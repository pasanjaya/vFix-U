import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private title = 'vFix-U';

  constructor() { }

  getTitle() {
    return this.title;
  }


}
