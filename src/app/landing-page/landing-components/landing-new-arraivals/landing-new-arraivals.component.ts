import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-new-arraivals',
  templateUrl: './landing-new-arraivals.component.html',
  styleUrls: ['./landing-new-arraivals.component.scss']
})
export class LandingNewArraivalsComponent implements OnInit {

  itemsPerSlide = 5;
  singleSlideOffset = true;

  constructor() { }

  slides = [
    {image: 'assets/images/carousel/6.jpg'},
    {image: 'assets/images/carousel/6.jpg'},
    {image: 'assets/images/carousel/6.jpg'}
  ];

  ngOnInit() {
  }

}
