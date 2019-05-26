import { AdvertisementData } from 'src/app/models/advertisement-data.model';
import { Component, OnInit } from '@angular/core';

import { LandingPageService } from '../../services/landingpage.service';

@Component({
  selector: 'app-landing-new-arraivals',
  templateUrl: './landing-new-arraivals.component.html',
  styleUrls: ['./landing-new-arraivals.component.scss']
})
export class LandingNewArraivalsComponent implements OnInit {

  isLoading = false;

  itemsPerSlide = 5;
  singleSlideOffset = true;

  advertisements: AdvertisementData[] = [];

  constructor(private landingPageService: LandingPageService) { }

  slides = [
    {image: 'assets/images/carousel/6.jpg'},
    {image: 'assets/images/carousel/6.jpg'},
    {image: 'assets/images/carousel/6.jpg'}
  ];

  ngOnInit() {
    this.isLoading = true;
    this.landingPageService.getNewArrivals();
    this.landingPageService.getAdvertisementUpdatedListener().subscribe((result: AdvertisementData[]) => {
      this.advertisements = result;
      this.isLoading = false;
      console.log(this.advertisements);
    });
  }

}
