import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private generalService: GeneralService) { }

  public focus;
  public title: string;

  ngOnInit() {
    this.title = this.generalService.getTitle();
  }

}
