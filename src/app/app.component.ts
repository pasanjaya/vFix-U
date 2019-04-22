import { Component, OnInit } from '@angular/core';

import { setTheme } from 'ngx-bootstrap/utils';

import { GeneralService } from './services/general.service';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private generalService: GeneralService, private authService: AuthService) {
    setTheme('bs4');
  }
  ngOnInit() {
    this.authService.autoAuthUser();
    this.generalService.getTitle();
  }

}
