import { GeneralService } from './../../../services/general.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-sidebar',
  templateUrl: './seller-sidebar.component.html',
  styleUrls: ['./seller-sidebar.component.scss']
})
export class SellerSidebarComponent implements OnInit {
  public title: string;
  isCollapsed = false;
  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.title = this.generalService.getTitle();
  }

}
