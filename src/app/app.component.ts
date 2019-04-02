import { Component, OnInit } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { GeneralService } from './services/general.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private generalService: GeneralService) {
    setTheme('bs4');
  }
  ngOnInit() {
    this.generalService.getTitle();
  }

}
