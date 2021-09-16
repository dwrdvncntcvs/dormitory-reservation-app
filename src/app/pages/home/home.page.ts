import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private storage: Storage, private userService: UserService) {
    this.userService.loadStoredToken(); //Sample
  }

  ngOnInit() {}


  dorm_list = [1,1,1,1]

  featured: any[] = [
    {
      "name": "Butter Dormitory",
      "rating": "4.5 Excellent",
      "ratings": "(500+)",
      "distance": "Batangas City, 0.7 miles away",
      "img": "https://s.realpage.com/wp-content/uploads/sites/20/2016/02/shutterstock_135206831-1-e1565815548959.jpg"
    },
    {
        "name": "Urban Greens Apartment",
        "id": "2",
        "rating": "4.8 Excellent",
        "ratings": "(500+)",
        "distance": "0.7 miles away",
        "img": "https://images.adsttc.com/media/images/5f6c/bff6/63c0/177d/1000/06f1/slideshow/0.jpg?1600962535"
    },
    {
        "name": "Tokyo Apartment",
        "id": "3",
        "rating": "4.8 Excellent",
        "ratings": "(500+)",
        "distance": "0.7 miles away",
        "img": "https://images.adsttc.com/media/images/5f6c/bff6/63c0/177d/1000/06f1/slideshow/0.jpg?1600962535"
    },
    {
        "name": "Qwerty Apartment",
        "id": "4",
        "rating": "4.8 Excellent",
        "ratings": "(500+)",
        "distance": "0.7 miles away",
        "img": "https://images.adsttc.com/media/images/5f6c/bff6/63c0/177d/1000/06f1/slideshow/0.jpg?1600962535"
    },
    {
        "name": "F8 Apartment",
        "id": "5",
        "rating": "4.8 Excellent",
        "ratings": "(500+)",
        "distance": "0.7 miles away",
        "img": "https://images.adsttc.com/media/images/5f6c/bff6/63c0/177d/1000/06f1/slideshow/0.jpg?1600962535"
    },
  ];

  featuredSlidesOpts = {
    initialSlide: 2,
    spaceBetween: 2,
    slidesPerView: 1.1,
    centeredSlides: true,
  }
}
