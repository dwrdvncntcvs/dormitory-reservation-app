import { SignInAsPage } from './../../pages/sign-in-as/sign-in-as.page';
import { Component, HostListener, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { SignUpAsPage } from 'src/app/pages/sign-up-as/sign-up-as.page';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userProfile: any = null;
  userRole: any = '';
  toggle: Boolean = false;
  url: string;

  pages = [
    {
      name: 'Explore',
      url: () => {
        this.checkUrl('home');
      },
    },
    {
      name: 'Dormitories',
      url: () => {
        this.checkUrl('dormitories');
      },
    },
    {
      name: 'About Us',
      url: () => {
        this.checkUrl('about-us');
      },
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
    this.checkToken();
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

  goToHome = (route) => {
    this.router.navigate([route]);
    this.onToggle();
  };

  goToAccount = (userRole) => {
    console.log('Role', userRole);
    if (userRole === 'owner') {
      this.router.navigate(['owner-tabs/account']);
    } else if (userRole === 'tenant') {
      this.router.navigate(['dormRes/account']);
    }
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

  checkToken = async () => {
    const token = await this.userService.loadStoredToken();
    let url: string;
    if (token) {
      const decoded_token = helper.decodeToken(token);
      const role = decoded_token.role;
      if (role === 'tenant') {
        url = 'tenant-tabs';
        this.url = url;
      }
      this.getUserProfile();
    }
    url = 'dormRes';
    this.url = url;
  };

  checkUrl = async (endpoint) => {
    const token = await this.userService.loadStoredToken();
    let url: string;
    if (token) {
      const decoded_token = helper.decodeToken(token);
      const role = decoded_token.role;
      if (role === 'tenant') {
        url = `tenant-tabs/${endpoint}`;
        this.router.navigate([url]);
      }
    } else {
      url = `dormRes/${endpoint}`;
      this.router.navigate([url]);
    }
  };
}
