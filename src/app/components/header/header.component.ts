import { SignInAsPage } from './../../pages/sign-in-as/sign-in-as.page';
import { Component, HostListener, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { SignUpAsPage } from 'src/app/pages/sign-up-as/sign-up-as.page';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  pages = [
    {
      name: 'Home',
      url: 'dormRes/home',
    },
    {
      name: 'Dormitories',
      url: 'dormRes/dormitories',
    },
    {
      name: 'About Us',
      url: 'dormRes/about-us',
    },
  ];

  pageWidth;
  pageHeight;

  signIn = SignInAsPage;
  signUp = SignUpAsPage;

  selectedPage = '';

  constructor(
    private modalController: ModalController,
    private platform: Platform,
  ) {
    this.onResize();
  }

  toggle: Boolean = false;

  ngOnInit() {

  }

  openModal = async (pageToBeLoaded) => {
    this.toggle = false;
    const modal = await this.modalController.create({
      component: pageToBeLoaded
    });
    modal.present();
  }

  @HostListener('window:resize', ['$event'])
  onResize = (event?) => {
    this.platform.ready().then(() => {
      this.pageWidth = this.platform.width();
    });
  }

  onToggle() {
    this.toggle = !this.toggle;
  }
}
