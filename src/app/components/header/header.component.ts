import { SignInAsPage } from './../../pages/sign-in-as/sign-in-as.page';
import { Component, HostListener, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { SignUpAsPage } from 'src/app/pages/sign-up-as/sign-up-as.page';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userProfile: any = null;
  userRole: any = '';
  toggle: Boolean = false;

  pages = [
    {
      name: 'Explore',
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
    private userService: UserService,
    private router: Router
  ) {
    this.checkPlatform();
    this.getUserProfile();
  }

  activePlatform: string;

  ngOnInit() {}

  openModal = async (pageToBeLoaded) => {
    this.toggle = false;
    const modal = await this.modalController.create({
      component: pageToBeLoaded,
    });
    modal.present();
  };

  @HostListener('window:resize', ['$event'])
  checkPlatform = () => {
    if (this.platform.is('desktop')) {
      this.activePlatform = 'web';
      this.pageHeight = this.platform.height();
      this.pageWidth = this.platform.width();
    }
    if (this.platform.is('android')) {
      this.activePlatform = 'android';
      this.pageHeight = this.platform.height();
      this.pageWidth = this.platform.width();
      console.log('Android');
    }
  };

  onToggle = () => {
    this.toggle = !this.toggle;
  };

  goToCreateDormitory = () => {
    this.router.navigate(['owner-tabs/create-dormitory']);
    this.onToggle();
  };

  goToHome = () => {
    this.router.navigate(['owner-tabs']);
    this.onToggle();
  };

  getUserProfile = () => {
    this.userService.userProfileRequest().then((response) => {
      response.subscribe((userProfile) => {
        console.log('User Profile: ', userProfile['user']);
        this.userProfile = userProfile['user'];
        this.userRole = userProfile['user'].role;
      });
    });
  };

  signOutAction = () => {
    this.userService.logOutRequest();
    if (this.userRole === 'owner') {
      this.toggle = false;
      this.router.navigate(['dormRes/home']);
    } else if (this.userRole === 'tenant') {
      location.reload();
    }
  };
}
