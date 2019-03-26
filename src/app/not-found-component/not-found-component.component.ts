import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found-component',
  templateUrl: './not-found-component.component.html',
  styleUrls: ['./not-found-component.component.scss']
})
export class NotFoundComponentComponent implements OnInit {

  private notFoundMessege = `We can\'t find the page you\'re looking for.
  You can either return to the previous page, visit our homepage
  or contact our support team.`;

  constructor() { }

  getNotFoundMessege(): string {
    return this.notFoundMessege;
  }

  setNotFoundMessege(message: string) {
    this.notFoundMessege = message;
  }

  ngOnInit() {
  }

}
