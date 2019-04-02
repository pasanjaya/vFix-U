import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {

  constructor(private generalService: GeneralService) { }

  public menuItems: any[];
  public isCollapsed = true;
  public title: string;

  ngOnInit() {
    this.title = this.generalService.getTitle();
  }
}
