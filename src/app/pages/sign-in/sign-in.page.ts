import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { SignUpPage } from '../sign-up/sign-up.page';
import { Storage } from '@ionic/storage';

const USER_TOKEN_KEY = 'user_token';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  displayRole: string;
  role: string;
  errorMessage: string = '';

  credentials = {
    username: '',
    plainPassword: '',
  };

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private userService: UserService,
    private loadingService: LoadingService,
    private router: Router,
    private storage: Storage
  ) {}

  ionViewDidEnter = () => {
    this.checkRole();
  };

  getErrorMessage() {
    const errorMessage = this.userService.errorMessage;
    if (errorMessage === 'Invalid Inputs') {
      this.errorMessage = 'Enter your valid email and password';
    } else {
      this.errorMessage = errorMessage;
    }
  }

  removeErrorMessage = () => {
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  };

  ngOnInit() {}

  closeModal() {
    this.errorMessage = '';
    this.modalController.dismiss();
  }

  checkRole() {
    this.role = this.navParams.get('role');
    if (this.role === 'owner') {
      this.displayRole = 'Owner';
    } else if (this.role === 'tenant') {
      this.displayRole = 'Tenant';
    }
  }

  goToSignUpModal = async (role: string) => {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: SignUpPage,
      componentProps: { role },
      cssClass: ['rounded-edges-modal'],
    });
    modal.present();
  };

  signInAction = async (role) => {
    this.loadingService.createNewLoading('Loading. . .');
    this.errorMessage = '';
    this.userService.signInRequest(this.credentials, role).then((response) => {
      response.subscribe(
        async (token) => {
          this.modalController.dismiss();
          const response_token = token['token'];

          this.storage.set(USER_TOKEN_KEY, response_token);

          if (role === 'owner') {
            this.router.navigateByUrl('/owner-tabs/dormitory-list');
            this.loadingService.dismissLoading();
          } else if (role === 'tenant') {
            this.router.navigateByUrl('/tenant-tabs/home');
            this.loadingService.dismissLoading();
          } else {
            return;
          }
        },
        (error) => {
          this.loadingService.dismissLoading();

          const err = error['error'].msg;
          if (err === 'Invalid Inputs') {
            this.errorMessage = 'Please enter valid email and password';
          } else {
            this.errorMessage = err;
          }
          this.removeErrorMessage();
        }
      );
    });
  };
}
