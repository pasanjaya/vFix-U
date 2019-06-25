import { AdvertisementData } from 'src/app/models/advertisement-data.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { LandingPageService } from '../../services/landingpage.service';
import { Subscription } from 'rxjs';

// import Glide from '@glidejs/glide';
// import { Autoplay, Images } from '@glidejs/glide/dist/glide.modular.esm';

@Component({
  selector: 'app-landing-new-arraivals',
  templateUrl: './landing-new-arraivals.component.html',
  styleUrls: ['./landing-new-arraivals.component.scss']
})
export class LandingNewArraivalsComponent implements OnInit, OnDestroy {
  isLoading = false;
  advertCount = 0;

  advertisements: AdvertisementData[] = [];
  private advertisementUpdatedListenerSub: Subscription;

  constructor(private landingPageService: LandingPageService) {}

  slides = [
    { id: 1, image: 'assets/images/carousel/6.jpg' },
    { id: 2, image: 'assets/images/carousel/2.jpg' },
    { id: 3, image: 'assets/images/carousel/3.jpg' }
  ];

  ngOnInit() {
    this.isLoading = true;
    this.landingPageService.getNewArrivals();
    this.advertisementUpdatedListenerSub = this.landingPageService
      .getAdvertisementUpdatedListener()
      .subscribe((result: AdvertisementData[]) => {
        this.advertisements = result;
        this.advertCount = this.advertisements.length;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.advertisementUpdatedListenerSub.unsubscribe();
  }
}
