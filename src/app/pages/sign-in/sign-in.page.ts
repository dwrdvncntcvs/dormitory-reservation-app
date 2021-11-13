import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { SignUpPage } from '../sign-up/sign-up.page';

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
    private loadingController: LoadingController
  ) {}

  ionViewDidEnter = () => {
    this.checkRole();
    this.removeErrorMessage();
  };

  getErrorMessage() {
    this.userService.errorMessage.subscribe((data) => {
      if (data === 'Invalid Inputs') {
        this.errorMessage = 'Enter your valid email and password';
      } else {
        this.errorMessage = data;
      }
    });
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
      cssClass: ['rounded-edges-modal']
    });
    modal.present();
  }

  //Sample
  signInAction = async (role) => {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    loading.present();
    this.errorMessage = '';
    this.userService.signInRequest(this.credentials, role);
    this.getErrorMessage();
  }
}
