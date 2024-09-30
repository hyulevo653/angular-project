import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-slick',
  standalone: true,
  imports: [ 
    SlickCarouselModule,
    CommonModule
  ],
  templateUrl: './slick.component.html',
  styleUrl: './slick.component.scss'
})
export class SlickComponent {
  slides = [
    { img: "assets/images/anh2.png" },
    { img: "assets/images/anh2.png" },
    { img: "assets/images/anh1.png" },
    { img: "assets/images/anh3.png" },
    { img: "assets/images/anh2.png" },
    { img: "assets/images/anh2.png" },
    { img: "assets/images/anh1.png" },
    { img: "assets/images/anh3.png" },
  
  ];
  
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,       
    autoplaySpeed: 4000,  
    infinite: true ,
    responsive: [
      {
        breakpoint: 768, // Tablet and smaller
        settings: {
          slidesToShow: 2, // Show 2 slides
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Mobile
        settings: {
          slidesToShow: 1, // Show 1 slide
          slidesToScroll: 1,
        },
      },
    ],       
  };
  
  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e:any) {
    console.log('slick initialized');
  }
  
  breakpoint(e:any) {
    console.log('breakpoint');
  }
  
  afterChange(e:any) {
    console.log('afterChange');
  }
  
  beforeChange(e:any) {
    console.log('beforeChange');
  }
}
