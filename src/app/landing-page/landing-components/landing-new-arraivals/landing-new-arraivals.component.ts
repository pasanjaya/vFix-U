import { AdvertisementData } from 'src/app/models/advertisement-data.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { LandingPageService } from '../../services/landingpage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landing-new-arraivals',
  templateUrl: './landing-new-arraivals.component.html',
  styleUrls: ['./landing-new-arraivals.component.scss']
})
export class LandingNewArraivalsComponent implements OnInit, OnDestroy {
  isLoading = false;

  itemsPerSlide = 5;
  singleSlideOffset = true;

  advertisements: AdvertisementData[] = [];
  private advertisementUpdatedListenerSub: Subscription;

  constructor(private landingPageService: LandingPageService) {}

  slides = [
    { image: 'assets/images/carousel/6.jpg' },
    { image: 'assets/images/carousel/6.jpg' },
    { image: 'assets/images/carousel/6.jpg' }
  ];

  ngOnInit() {
    this.isLoading = true;
    this.landingPageService.getNewArrivals();
    this.advertisementUpdatedListenerSub = this.landingPageService
      .getAdvertisementUpdatedListener()
      .subscribe((result: AdvertisementData[]) => {
        this.advertisements = result;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.advertisementUpdatedListenerSub.unsubscribe();
  }
}
