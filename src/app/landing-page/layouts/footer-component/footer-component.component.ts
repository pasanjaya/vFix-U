import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-component',
  templateUrl: './footer-component.component.html',
  styleUrls: ['./footer-component.component.scss']
})
export class FooterComponentComponent implements OnInit {

  public title = 'vFix-U';

  constructor() { }

  getTitle() {
    return this.title;
  }

  ngOnInit() {
  }

}
