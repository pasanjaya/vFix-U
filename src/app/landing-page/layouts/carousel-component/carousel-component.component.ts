import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-component',
  templateUrl: './carousel-component.component.html',
  styleUrls: ['./carousel-component.component.scss']
})
export class CarouselComponentComponent implements OnInit {

  constructor() { }

  slides = [
    {image: 'assets/images/carousel/2.jpg'},
    {image: 'assets/images/carousel/3.jpg'},
    {image: 'assets/images/carousel/4.jpg'}
  ];

  ngOnInit() {
  }

}
