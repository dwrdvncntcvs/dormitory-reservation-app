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
      cssClass: 'rounded-edges-modal',
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
    if (userRole === 'owner') {
      this.router.navigate(['owner-tabs/profile']);
    } else if (userRole === 'tenant') {
      this.router.navigate(['tenant-tabs/profile']);
    }
  };

  getUserProfile = () => {
    this.userService.userProfileRequest().then((response) => {
      response.subscribe((userProfile) => {
        this.userProfile = userProfile['user'];
        this.userRole = userProfile['user'].role;
      });
    });
  };

  signOutAction = () => {
    this.userService.logOutRequest();
    this.userProfile = null;
    this.toggle = false;
  };

  currentUrl = (role: string) => {
    if (role === 'owner') {
      this.router.navigate(['owner-tabs']);
    } else if (role === 'tenant') {
      this.router.navigate(['tenant-tabs']);
    } else if (role === '') {
      this.router.navigate(['dormRes']);
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
        this.getUserProfile();
      } else if (role === 'owner') {
        url = 'owner-tabs';
        this.url = url;
        this.getUserProfile();
      }
    } else {
      url = 'dormRes';
      this.url = url;
    }
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
