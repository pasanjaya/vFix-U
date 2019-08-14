import { Component, OnInit, OnDestroy } from '@angular/core';
import { SupportData } from 'src/app/models/support-data.model';
import { Subscription } from 'rxjs';
import { SupportService } from './../../../services/support.service';

@Component({
  selector: 'app-admin-mail',
  templateUrl: './admin-mail.component.html',
  styleUrls: ['./admin-mail.component.scss']
})
export class AdminMailComponent implements OnInit, OnDestroy {
  isLoading = false;
  supportData: SupportData[] = [];

  private supportDataSub: Subscription;

  constructor(
    private supportService: SupportService
  ) { }

  ngOnInit() {
    this.supportService.getSupportList();
    this.supportDataSub = this.supportService
      .getSupportDataUpdatedListener()
      .subscribe((supportData) => {
        this.supportData = supportData;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.supportDataSub.unsubscribe();
  }
}


